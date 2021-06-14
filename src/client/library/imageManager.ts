import { Client, query as q } from "faunadb";
import { makeAutoObservable } from "mobx";
import { ImageDocument } from "types/documents";
import { FaunaRef } from "types/fauna";
import { getClient } from "utilities/db";
import { fromFauna, toFaunaRef } from "utilities/fauna";
import { rest } from "utilities/request";

/**
 * Manages the state and massive list of images, allowing for fast
 * and efficient management of them on the front end
 */
export class ImageManager {
  public images: Record<string, ImageDocument> = {};
  public imageList: string[] = [];
  private ourCDNPrefex = "none";
  private client: Client;

  constructor() {
    this.client = getClient();
    makeAutoObservable(this);
  }

  /**
   * Fetches the initial collection of images from the server
   */
  public async fetchImages(): Promise<void> {
    const imageResponse = await rest.get(`/api/images`);
    if (!imageResponse.success) { return; }
    this.loadImages((imageResponse.data as any).images);
  }

  /**
   * Loads the images into the image manager
   * @param images The array of images to load into the image manager
   * @param startIndex The index to insert the images into, if doing multiple pages.
   */
  public loadImages(images: ImageDocument[], startIndex?: number): void {
    if (startIndex === undefined) {
      startIndex = this.imageList.length;
    }

    const newImageList: string[] = [];
    images.forEach((image: ImageDocument) => {
      this.images[image.id as string] = image;
      newImageList.push(image.id as string);
    });

    this.imageList = this.imageList.concat(newImageList);
  }

  /**
   * Deletes a single image and removes it from the ImageManager
   * @param index The index of the image within the imageList to delete. Used over
   * the ID so that we can quickly reference the array and remove it everywhere in
   * as short a time as possible
   */
  public async deleteImage(imageID: string): Promise<void> {
    let index = -1;
    for(let i = 0; i < this.imageList.length; i++) {
      if(this.imageList[i] === imageID) {
        index = i;
        break;
      }
    }

    if (index === -1 || !this.images[this.imageList[index]]) { throw "The image to delete does not exist."; }

    const image = this.images[this.imageList[index]];
    if (this.isExternal(image)) {
      this.client.query(q.Delete(image.ref as FaunaRef));
    } else {
      rest.delete(`/api/images/${image.id}`, {});
    }
    delete this.images[this.imageList[index]];
    this.imageList.splice(index, 1);
  }

  /**
   * Fetches an image. Returns nothing if the imageID does not exist in this manager, and pulls from fauna
   * if it's only partially present.
   * @param imageID The ID of the image to fetch
   */
  public async fetchImage(imageID: string ): Promise<ImageDocument> {
    if (!this.images[imageID]) { return {}; }
    if (this.images[imageID].ownedBy !== undefined) { return this.images[imageID]; }
    this.images[imageID] = fromFauna(
      await this.client.query(q.Get(toFaunaRef(imageID, this.images[imageID].collection as string)))
    ) as ImageDocument;
    return this.images[imageID];
  }

  /**
   * Saves a linked image to the database.
   * @param values The image values to save
   */
  public saveLinkedImage(values: ImageDocument): void {
    const tempID = "temp";
    values.id = tempID;
    this.images[tempID] = values;
    this.imageList.splice(0, 0, tempID);
    rest.put(`/api/images/external`, values as Record<string, unknown>)
    .then((res: any) => {
      if (res.success === false) {
        delete this.images[tempID];
        this.imageList = this.imageList.splice(0, 1);
        return;
      }

      this.images[res.data.image.id] = res.data.image;
      this.imageList[0] = res.data.image.id;
      delete this.images[tempID];

    });
  }

  /**
   * Checks if an image is external without a database call. If unknown, return false
   * @param image The image to determine if external or not
   */
  public isExternal(image: ImageDocument): boolean {
    if (image.isExternal) { return true; }
    if (image.src && image.src.includes(this.ourCDNPrefex)) { return false; }
    return true;
  }
}
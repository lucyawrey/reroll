import { Input, Modal, Tooltip } from "components/design";
import { Button, Col, Row } from "components/style";
import { Formik, Form as FormikForm } from "formik";
import React from "react";
import { Card } from "react-bootstrap";
import { rest } from "utilities/request";

interface UploadImageModalProps {
  modal: boolean;
  handleClose: () => void;
}

export function UploadImageModal({ handleClose, modal }: UploadImageModalProps) {
  async function saveLinkedImage(values: any) {
    rest.put(`/api/images/external`, values)
    .then((res) => {
      // Clear form
      // Close modal?
      handleClose();
    })
    .catch((err) => {
      // Print errors
    });
  }

  return (
    <Modal open={modal} handleClose={handleClose}>
      <Card>
        <Card.Header><h3>New Image</h3></Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={6}>
              <Formik
                initialValues={{ src: "", name: "" }}
                onSubmit={saveLinkedImage}
              >
                { (formik) => (
                  <FormikForm>
                    <h4>
                      Link Image
                      <Tooltip title="Save a reference to the image"><span>(?)</span></Tooltip>
                    </h4>
                    <label>Link</label>
                    <Input name="src"/>
                    <label>Name</label>
                    <Input name="name"/>
                    <label>Preview</label>
                    <img style={{ width: "100%", height: "auto" }} src={formik.values.src}/><br/>

                    <Button type="submit">Save</Button>
                  </FormikForm>
                )}
              </Formik>
            </Col>
            <Col xs={12} md={6}>
              <h4>Upload Image</h4>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Modal>
  );
}
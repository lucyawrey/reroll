import React from "react";
import { Input } from "components/design/forms/Input";
import { CoreInputProps } from "types/design/form";

/**
 * An input set up for handling datetimes. Formats the Input function to work properly
 * @param props.aria-label The usability label
 * @param props.disabled If an input is disabled or not
 * @param props.id The input id
 * @param props.label The label of the inputs
 * @param props.name The name of the input
 * @param props.placeholder A placeholder value for when the input is empty
 * @param props.size The bootstrap size of the input.
 * @param props.xs Width for extra small screens
 * @param props.sm Width for small screens
 * @param props.md Width for extra medium screens
 * @param props.lg Width for large screens
 * @param props.xl Width for extra large screens
 */
export function DateTime(props: CoreInputProps): JSX.Element {
  return <Input {...props} type="datetime-local"/>;
}

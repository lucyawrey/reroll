import { Form, Formik } from "formik";
import React from "react";
import { Button, Card, Col, FormGroup, FormLabel, Row } from "react-bootstrap";
import { ContextMenu, ErrorMessage, fetchContentResponse, IndexTable, Input, Modal, Page } from "components/design";
import request from "utilities/request";
import { MdBlock, MdBuild, MdInfo } from "react-icons/md";
import { ContextMenuBuilder, TableBuilder } from "utilities/design";
import { TableComponentProps } from "types/design";
import { useRouter } from "next/router";
import * as Yup from "yup";

// The props for the RulesetPage
interface RulesetProps {
  initialRulesets: any[];
  rulesetCount: number;
}

// The expected data packet response from the server for fetching rulesets
interface FetchRulesetsData {
  rulesets: any[];
  rulesetCount: number;
}

const initialPerPage = 10; // The initial limit of items per page
const initialSortBy = "name";

/**
 * Queries rulesets
 * @param page The target page
 * @param perPage The maximum number of items per page
 * @param filters Any additional filters for filtering content
 */
async function queryRulesets(
  filters: Record<string, unknown> = {},
  limit: number,
  skip: number,
  sortBy: string,
): Promise<fetchContentResponse> {
  const body = { filters, options: {
    limit: limit,
    skip: skip,
    sort: sortBy,
  }};
  const res = await request.post<any>("/api/rulesets", body);
  if (res.success) { return { content: res.data.rulesets, count: res.data.rulesetCount }; }
  return { content: [], count: 0 };
}

/**
 * Renders the form to create a new game system.
 */
function CreateRulesetForm() {
  const router = useRouter();

  /**
   * Runs the submit action of the create game system form and handles
   * the success and failure results
   *
   * @param values The values from the form to submit
   */
  async function onSubmit(values: Record<string, string>) {
    const response = await request.put<{ ruleset: any }>(
      "/api/rulesets",
      values
    );
    if (!response.success) {
      return;
    }

    const href = `/rulesets`;
    router.push(href);
  }

  return (
    <Formik
      initialErrors={ {} }
      initialValues={ { name: "" } }
      onSubmit={onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("Required")
          .max(100, "Maximum of 100 characters"),
      })}
    >
      {() => (
        <Form>
          {/* Just name for now */}
          <Row>
            <FormGroup as={Col} xs={12} lg={6}>
              <FormLabel>Ruleset Name</FormLabel>
              <Input name="name"/>
              <ErrorMessage name="name"/>
            </FormGroup>
          </Row>

          <Button type="submit">Submit!</Button>
        </Form>
      )}
    </Formik>
  );
}

/**
 * Renders a modal for the Rulesets Page to create a new ruleset
 *
 * @param handleClose The function that handles closing the modal
 * @param modal Boolean. Show the modal if true.
 */
function RulesetModal({ handleClose, modal }: { handleClose: () => void, modal: boolean }) {
  return (
    <Modal open={modal} handleClose={handleClose}>
      <Card>
        <Card.Header>Create a New Ruleset</Card.Header>
        <Card.Body>
          <CreateRulesetForm/>
        </Card.Body>
      </Card>
    </Modal>
  );
}

function RulesetFilter() {
  return (
    <>
      <Input name="name.like"/>
    </>
  );
}

/**
 * Renders out the base Ruleset page.
 * @param initialRulesets The initial group of rulesets to render in the table
 * @param rulesetCount The initial count of rulesets retrievable
 */
export default function Rulesets({ initialRulesets, rulesetCount }: RulesetProps) {
  const [ modal, setModal ] = React.useState(false); // Boolean for rendering the modal
  function handleClose() { setModal(false); } // Handles closing the modal

  /**
   * Runs the action to delete the ruleset
   * @param context The context for rendering information
   */
  async function deleteRuleset(context: any) {
    return;
  }

  // Adds actions for the table builder
  const rulesetActions = new ContextMenuBuilder()
    .addLink("Details", MdInfo, "/rulesets/[alias]")
    .addLink("Edit", MdBuild, "/rulesets/[alias]/edit")
    .addItem("Delete", MdBlock, (context: any) => (deleteRuleset(context)));

  // Builds the table columns
  const tableBuilder = new TableBuilder()
    .addIncrementColumn("")
    .addDataColumn("Ruleset", "name", { sortable: true })
    .addComponentColumn("Tools", RulesetActions);

  /**
   * Renders the actions for the rulesets page
   * @param data A ruleset object
   */
  function RulesetActions({ data }: TableComponentProps) {
    return (
      <ContextMenu
        context={{_id: data._id, name: data.name, alias: data.alias || data._id}}
        {...rulesetActions.renderConfig()}
      />
    );
  }

  return (
    <Page>
      <h1>Rulesets</h1>
      {/* Create Ruleset */}
      <Button onClick={() => { setModal(true); }}>New Ruleset</Button>
      <RulesetModal modal={modal} handleClose={handleClose}/>
      <br/><br/>
      <IndexTable
        tableBuilder={tableBuilder}
        content={initialRulesets}
        contentCount={rulesetCount}
        fetchContent={queryRulesets}
        filters={{ name: {like: "" } }}
        limit={initialPerPage}
        sort="name"
      >
        <RulesetFilter/>
      </IndexTable>
    </Page>
  );
}

Rulesets.getInitialProps = async () => {
  const res = await request.post<FetchRulesetsData>(
    "/api/rulesets", { options: { limit: initialPerPage, sort: initialSortBy } }
  );
  return { initialRulesets: res.data.rulesets, rulesetCount: res.data.rulesetCount };
};

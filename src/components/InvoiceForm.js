import { useDispatch, useSelector } from "react-redux";
import { billToActions } from "../store/billTo-slice";
import { billFromActions } from "../store/billFrom-slice";
import InvoiceItem from "./InvoiceItem";
import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { itemActions } from "../store/item-slice";
import InvoiceModal from "./InvoiceModal";

const InvoiceForm = () => {
  const dispatch = useDispatch();
  const billTo = useSelector((state) => state.billTo);
  const billFrom = useSelector((state) => state.billFrom);
  const cart = useSelector((state) => state.cart);
  const [dateIssue, setDateIssue] = useState("");

  const [invoice, setInvoice] = useState(1);
  //  function for bill too optimize them in future
  const toNameChangeHandler = (event) => {
    dispatch(billToActions.name(event.target.value));
  };

  const toEmailChangeHandler = (event) => {
    dispatch(billToActions.email(event.target.value));
  };
  const toAddressChangeHandler = (event) => {
    dispatch(billToActions.address(event.target.value));
  };

  //  function for bill from optimized in future
  const fromNameChangeHandler = (event) => {
    dispatch(billFromActions.name(event.target.value));
  };

  const fromEmailChangeHandler = (event) => {
    dispatch(billFromActions.email(event.target.value));
  };
  const fromAddressChangeHandler = (event) => {
    dispatch(billFromActions.address(event.target.value));
  };

  const noteChangeHandler = (event) => {
    dispatch(itemActions.note(event.target.value));
  };

  const dateIssueHandler = (event) => {
    event.preventDefault();
    setDateIssue(event.target.value);
  };

  const invoiceChangeHandler = (event) => {
    event.preventDefault();
    setInvoice(event.target.value);
  };

  const currencyChangeHandler = (event) => {
    dispatch(itemActions.currencyChange(event.target.value));
  };

  const taxRateChangeHandler = (event) => {
    dispatch(itemActions.taxRateChange(event.target.value));
    dispatch(itemActions.handleCalculateTotal());
    console.log(cart.taxRate);
    console.log(event.target.value);
  };

  const discountRateChangeHandler = (event) => {
    dispatch(itemActions.discountRateChange(event.target.value));
    dispatch(itemActions.handleCalculateTotal());
  };

  const openModalHandler = (event) => {
    event.preventDefault();
    dispatch(itemActions.handleCalculateTotal());
    dispatch(itemActions.openModal());
  };

  console.log(cart.subTotal);
  console.log(cart.discountAmount);
  console.log(cart.currency);
  // console.log(billTo.billToName);
  // console.log(billTo.billToEmail);
  // console.log(billTo.billToAddress);
  // console.log("bill From");
  // console.log(billFrom.billToName);
  // console.log(billFrom.billToEmail);
  // console.log(billFrom.billToAddress);

  return (
    <Form onSubmit={openModalHandler}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateIssue}
                    name={"dateOfIssue"}
                    onChange={dateIssueHandler}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoice}
                  name={"invoiceNumber"}
                  onChange={invoiceChangeHandler}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  rows={3}
                  className="my-2"
                  placeholder={"Who is this invoice to?"}
                  value={billTo.billToName}
                  type="text"
                  name="billTo"
                  onChange={toNameChangeHandler}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  className="my-2"
                  placeholder={"Email address"}
                  value={billTo.billToEmail}
                  type="email"
                  name="billToEmail"
                  onChange={toEmailChangeHandler}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  className="my-2"
                  placeholder={"Billing address"}
                  value={billTo.billToAddress}
                  type="text"
                  name="billToAddress"
                  autoComplete="address"
                  onChange={toAddressChangeHandler}
                  required="required"
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  rows={3}
                  className="my-2"
                  placeholder={"Who is this invoice from?"}
                  value={billFrom.billToName}
                  type="text"
                  name="billFrom"
                  onChange={fromNameChangeHandler}
                  autoComplete="name"
                  required="required"
                />
                <Form.Control
                  className="my-2"
                  placeholder={"Email address"}
                  value={billFrom.billToEmail}
                  type="email"
                  name="billFromEmail"
                  onChange={fromEmailChangeHandler}
                  autoComplete="email"
                  required="required"
                />
                <Form.Control
                  className="my-2"
                  placeholder={"Billing address"}
                  value={billFrom.billToAddress}
                  type="text"
                  name="billFromAddress"
                  autoComplete="address"
                  onChange={fromAddressChangeHandler}
                  required="required"
                />
              </Col>
            </Row>
            <InvoiceItem />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {cart.currency}
                    {cart.subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({cart.discountRate || 0}%)</span>
                    {cart.currency}
                    {cart.discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({cart.taxRate || 0}%)</span>
                    {cart.currency}
                    {cart.taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {cart.currency}
                    {cart.total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={cart.notes}
              onChange={noteChangeHandler}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button variant="primary" type="submit" className="d-block w-100">
              Review Invoice
            </Button>
            <InvoiceModal closeModal={openModalHandler} dateIssue={dateIssue} />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={currencyChangeHandler}
                className="btn btn-light my-1"
                aria-label="Change Currency"
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={cart.taxRate}
                  onChange={taxRateChangeHandler}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={cart.discountRate}
                  onChange={discountRateChangeHandler}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;

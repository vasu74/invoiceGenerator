import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import ItemRow from "./ItemRow";
import { itemActions } from "../store/item-slice";

function InvoiceItem() {
  const items = useSelector((state) => state.cart.items);
  const currency = useSelector((state) => state.cart.currency);
  const dispatch = useDispatch();

  const onAddHandler = () => {
    dispatch(itemActions.addItemToCart());
    dispatch(itemActions.handleCalculateTotal());
  };

  const itemTable = items.map((item) => {
    return <ItemRow item={item} key={item.id} currency={currency} />;
  });

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>{itemTable}</tbody>
      </Table>
      <Button className="fw-bold" onClick={onAddHandler}>
        Add Item
      </Button>
    </div>
  );
}

export default InvoiceItem;

import { useDispatch } from "react-redux";
import EditableField from "./EditableField";
import { BiTrash } from "react-icons/bi";
import "bootstrap/dist/css/bootstrap.min.css";

import { itemActions } from "../store/item-slice";

function ItemRow(props) {
  const dispatch = useDispatch();

  const onDeleteHandler = () => {
    dispatch(itemActions.removeItemToCart(props.item));
    dispatch(itemActions.handleCalculateTotal());
  };

  const InputChangeHandler = (event) => {
    dispatch(
      itemActions.itemEditHandler({
        id: event.target.id,
        name: event.target.name,
        value: event.target.value,
      })
    );
    dispatch(itemActions.handleCalculateTotal());
    // console.log(event.target.id);
    // console.log(event.target.name);
    // console.log(event.target.value);
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onChange={InputChangeHandler}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: props.item.name,
            id: props.item.id,
          }}
        />
        <EditableField
          onChange={InputChangeHandler}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: props.item.description,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onChange={InputChangeHandler}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: props.item.quantity,
            id: props.item.id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onChange={InputChangeHandler}
          cellData={{
            leading: props.currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            presicion: 2,
            textAlign: "text-end",
            value: props.item.price,
            id: props.item.id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDeleteHandler}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
}

export default ItemRow;

import { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import { useNotification } from "../Context/NotificationProvider";
import { Column } from "./Column";
import { Disk } from "./Disk";

function randomColorHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, "0")}`;
}

export const Game = () => {
  const { pushNotification } = useNotification();

  const [sizeInput, setSizeInput] = useState(3);
  const [size, setSize] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDisk, setSelectedDisk] = useState(null);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    reset(3);
    return () => {};
  }, []);

  useEffect(() => {
    checkWin();
  }, [columns]);

  const reset = (len) => {
    const newDisks = [...new Array(len)]
      .map((_, index) => {
        const value = ++index;
        return {
          name: `Disk ${value}`,
          value,
          color: randomColorHex(),
        };
      })
      .reverse();
    setColumns([
      {
        name: "Column 1",
        disks: newDisks,
        color: "red",
        order: 1,
      },
      { name: "Column 2", disks: [], order: 2, color: "green" },
      { name: "Column 3", disks: [], order: 3, color: "blue" },
      // { name: "Column 4", disks: [], order: 4, color: "yellow" },
    ]);
    setSelectedDisk(null);
  };

  const popDisk = (column) => {
    if (isLoading || !column.disks.length || selectedDisk) return;
    setIsLoading(true);
    const disks = [...column.disks]; //deep copy
    setSelectedDisk(disks.pop());
    setColumns((prevColumns) =>
      [
        ...prevColumns.filter((col) => col.order !== column.order),
        { ...column, disks },
      ].sort((a, b) => a.order - b.order)
    );
    setIsLoading(false);
  };

  const pushDisk = (column) => {
    if (isLoading || !selectedDisk) return;
    setIsLoading(true);
    const disks = [...column.disks]; //deep copy
    if (disks.length && disks[disks.length - 1].value < selectedDisk.value) {
      setIsLoading(false);
      return;
    }
    disks.push(selectedDisk);
    setSelectedDisk(null);
    setColumns((prevColumns) =>
      [
        ...prevColumns.filter((col) => col.order !== column.order),
        { ...column, disks },
      ].sort((a, b) => a.order - b.order)
    );
    setIsLoading(false);
  };

  const checkWin = () => {
    const lastColumn = { ...columns[columns.length - 1] };
    const isWin = lastColumn?.disks?.length === size;
    if (isWin)
      pushNotification({
        title: "Chúc mừng",
        content: "Bạn đã hoàn thành game.",
      });
  };

  const onClickHandle = (column) => {
    !selectedDisk ? popDisk(column) : pushDisk(column);
  };

  const renderColumns = columns.map((col) => (
    <Column
      key={col.name}
      disks={col.disks}
      color={col.color}
      size={size}
      onClick={() => onClickHandle(col)}
    ></Column>
  ));
  return (
    <>
      <div
        className="d-flex  flex-column overflow-hidden"
        style={{ height: "100vh" }}
      >
        <div className="p-2">
          <Row>
            <h1 className="text-md-center">The Tower of Hanoi Game</h1>
            <Col className="mx-auto" md={8}>
              <Form.Group>
                <Form.Label>Size</Form.Label>
                <InputGroup>
                  <Form.Control
                    value={sizeInput}
                    onChange={(e) => setSizeInput(parseInt(e.target.value))}
                    type="number"
                    min="2"
                    max="8"
                  ></Form.Control>
                  <Button
                    onClick={() => {
                      setSize(sizeInput);
                      reset(sizeInput);
                    }}
                  >
                    Reset
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </div>
        <div className="d-flex flex-row flex-grow-1 position-relative p-3">
          <div className="position-absolute w-100">
            <div className="w-25 mx-auto">
              {selectedDisk && (
                <Disk {...selectedDisk}>{selectedDisk.name}</Disk>
              )}
            </div>
          </div>
          {renderColumns}
        </div>
      </div>
    </>
  );
};

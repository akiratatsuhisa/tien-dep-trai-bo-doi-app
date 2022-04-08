import { Disk } from "./Disk";

export const Column = ({ color, size, disks, onClick, ...props }) => {
  const renderDisk = disks.map(({ name, value, color }) => (
    <Disk key={name} value={value} color={color} size={size}>
      {name}
    </Disk>
  ));
  return (
    <div
      className="flex-grow-1 flex-shrink-1 position-relative"
    >
      <div
        className="position-absolute d-flex align-items-center flex-column"
        style={{
          left: "0",
          right: "0",
          top: "20%",
          bottom: "0",
        }}
      >
        <div className="rounded-top shadow-lg"
          style={{ width: "30px", height: "100%", backgroundColor: color }}
        ></div>
      </div>
      <div
        onClick={onClick}
        className="Container position-absolute d-flex flex-column-reverse align-items-center"
        style={{
          left: "0",
          right: "0",
          top: "0",
          bottom: "0",
        }}
      >
        {renderDisk}
      </div>
    </div>
  );
};

import {
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Td,
  Tag,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import moment from "moment";
import { FaCircle, FaEdit, FaTrash } from "react-icons/fa";

interface MyObject {
  [key: string]: any;
}

const typeToJSX = (val: any, objectCol: string | undefined) => {
  if (val === null) return <>NULL</>;

  if (typeof val === "boolean")
    return (
      <>
        <FaCircle color={val ? "#50FF50" : "#FF5050"} />
      </>
    );

  if (Array.isArray(val))
    return (
      <HStack>
        {val.map((el: string, index: number) => (
          <Tag key={index}>{typeToJSX(el, objectCol)}</Tag>
        ))}
      </HStack>
    );

  const date = moment(val, moment.ISO_8601, true);
  if (date.isValid()) return <>{date.format("DD/MM/YYYY")}</>;

  if (typeof val === "object")
    return (
      <>
        {objectCol ? (
          val[objectCol]
        ) : (
          <TableData
            excludeCols={["candidatureId"]}
            data={[val]}
            idCol="candidatureId"
          />
        )}
      </>
    );
  let str: string = val.toString();

  const MAX_LEN: number = 15;
  if (str.length >= MAX_LEN) {
    str = str.substring(0, MAX_LEN).concat("...");
    return <Tooltip label={val.toString()}>{str}</Tooltip>;
  }
  return <>{str}</>;
};

export default function TableData({
  data,
  idCol,
  excludeCols,
  objectCol,
  actions,
}: {
  data: Array<MyObject>;
  idCol: string;
  excludeCols: string[];
  objectCol?: string;
  actions?: ((id: number, value: MyObject) => React.JSX.Element)[];
}) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {data[0] &&
              Object.keys(data[0])
                .filter((key) => !excludeCols.includes(key))
                .map((header, index) => <Th key={index}>{header}</Th>)}
            {actions && <Th>Action</Th>}
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((elt) => (
              <Tr key={elt[idCol]}>
                {Object.values(elt)
                  .filter(
                    (_, index) => !excludeCols.includes(Object.keys(elt)[index])
                  )
                  .map((val, index) => (
                    <Td key={index}>{typeToJSX(val, objectCol)}</Td>
                  ))}
                {actions && (
                  <Td>
                    <HStack>
                      {actions.map((action) => action(elt[idCol], elt))}
                    </HStack>
                  </Td>
                )}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

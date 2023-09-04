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
} from "@chakra-ui/react";
import React from "react";
import moment from 'moment';

interface MyObject {
  [key: string]: any;
}

const typeToJSX = (val: any, objectCol: string | undefined) => {
  if (val === null)
    return (<>NULL</>);

  if (Array.isArray(val))
    return (
      <HStack>
        {val.map((el: string, index: number) => (
          <Tag key={index}>{typeToJSX(el, objectCol)}</Tag>
        ))}
      </HStack>
    );

  const date = moment(val, moment.ISO_8601, true);
  if (date.isValid())
    return (<>{date.format("DD/MM/YYYY")}</>)

  if (typeof(val) === 'object')
    return (<>{objectCol ? val[objectCol] : JSON.stringify(val)}</>)

  return <>{val.toString()}</>;
};

export default function TableData({
  data,
  idCol,
  excludeCols,
  objectCol
}: {
  data: Array<MyObject>;
  idCol: string;
  excludeCols: string[];
  objectCol?: string;
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
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.map((elt) => (
              <Tr key={elt[idCol]}>
                {Object.values(elt)
                  .filter((_, index) => !excludeCols.includes(Object.keys(elt)[index]))
                  .map((val, index) => (
                    <Td key={index}>
                      {typeToJSX(val, objectCol)}
                    </Td>
                  ))}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

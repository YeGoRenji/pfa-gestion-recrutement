import { Flex, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { KeyboardEventHandler, useState } from "react";
import { ChangeHandler } from "react-hook-form";

type Props = {
  defaultList?: string[];
  placeHolder: string;
  name: string;
  onChange: (tags: string[]) => void;
};

export default function TagList({
  onChange,
  defaultList,
  placeHolder,
  name,
}: Props) {
  const [tags, setTags] = useState<string[]>(defaultList || []);

  const onKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      let input = e.currentTarget.value.trim();
      if (input.length === 0 || input[0] === "" || tags.includes(input)) return;
      setTags((tags) => {
        const newTags = [...tags, input];
        onChange(newTags);
        return newTags;
      });

      e.currentTarget.value = "";
    }
  };

  const onDelete = (i: number) => {
    setTags((tags) => {
      const newTags = tags.filter((_, index) => index != i);
      onChange(newTags);
      return newTags;
    });
  };

  return (
    <div>
      <Flex wrap="wrap" gap={2}>
        {tags.map((val, index) => (
          <Tag
            size="sm"
            key={index}
            borderRadius="full"
            variant="solid"
            colorScheme="blue"
          >
            <TagLabel>{val}</TagLabel>
            <TagCloseButton onClick={() => onDelete(index)} />
          </Tag>
        ))}
      </Flex>
      <Input
        mt={2}
        name={name}
        onKeyUp={(e) => onKeyUp(e)}
        placeholder={placeHolder}
      />
    </div>
  );
}

// components/input-text.tsx
import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useState } from "react";

type InputTextProps = {
  placeholder?: string;
  onSearch: (city: string) => void;
};

export default function InputText({ placeholder, onSearch }: InputTextProps) {
  const [value, setValue] = useState("");

  function handleSearch() {
    if (value.trim()) {
      onSearch(value);
    }
  }

  return (
    <InputGroup size="lg" maxW="lg" mx="auto" bg="white" borderRadius="md">
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        color="black"
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <InputRightElement>
        <IconButton
          aria-label="Buscar"
          icon={<SearchIcon />}
          size="sm"
          onClick={handleSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
}

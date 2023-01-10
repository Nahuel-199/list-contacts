import React from "react";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

const ContactCard = ({ contact, onOpen, getContactId, deleteContact }) => {
  const updateHandler = (id) => {
    getContactId(id);
    onOpen();
  };

  const deleteContactHandler = (id) => {
    deleteContact(id);
  };

  return (
    <Flex
      color="white"
      justify="space-between"
      bg="blackAlpha.800"
      p="4"
      borderRadius="x1"
      boxShadow="x1"
      mb="4"
    >
      <Flex align="center">
        <Box mr="4">
          <FontAwesomeIcon size="3x" icon={faUser} mr="4" style={{width: "30px"}}/>
        </Box>
        <Stack>
          <Text>{contact.nombre}</Text>
          <Text>{contact.razonSocial}</Text>
          <Text>{contact.nit}</Text>
          <Text>{contact.telefono}</Text>
          <Text>{contact.codigo}</Text>
        </Stack>
      </Flex>

      <Flex align="center" cursor="pointer">
        <Box mr="4" onClick={() => updateHandler(contact.id)}>
          <FontAwesomeIcon size="5x" icon={faEdit} style={{width: "30px"}}/>
        </Box>
        <Box color="red.300" onClick={() => deleteContactHandler(contact.id)}>
          <FontAwesomeIcon size="5x" icon={faTrash} style={{width: "30px"}}/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default ContactCard;

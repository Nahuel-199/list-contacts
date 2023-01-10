import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import { Image } from "@chakra-ui/image";
import { Flex, Heading } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import ContactCard from "./components/card/ContactCard";
import ContactForm from "./components/form/ContactForm";
import ModalComponent from "./components/modal/ModalComponent";
import {
  addContactOnServer,
  getAllContacts,
  updateContactOnServer,
  deleteContactOnServer,
} from "./network";
import Paginacion from "./components/pagination/Paginacion";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();

  const [pagina, setPagina] = useState(1);
  const [porPagina,] = useState(5);
  const [SearchData, setSearchData] = useState("")
  const [contacts, setContacts] = useState([]);
  const [contactId, setContactId] = useState();

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getAllContacts();
      const tempArray = [];
      Object.entries(data).forEach(([key, value]) => {
        tempArray.push({
          id: key,
          nombre: value.nombre,
          razonSocial: value.razonSocial,
          nit: value.nit,
          telefono: value.telefono,
          codigo: value.codigo,
        });
      });
      setContacts(tempArray);
    };
    fetchContacts();
  }, []);

  const addNewContact = async (nombre, razonSocial, nit, telefono, codigo) => {
    if (
      contacts.findIndex((contact) => contact.nombre === nombre) === -1 &&
      nombre !== ""
    ) {
      const data = await addContactOnServer(
        nombre,
        razonSocial,
        nit,
        telefono,
        codigo
      );

      setContacts([
        ...contacts,
        { nombre, razonSocial, nit, telefono, codigo, id: data.nombre },
      ]);
    }
  };

  let searchContacts = contacts.filter((contact) =>
    contact.nombre.includes(SearchData)
  );
  console.log(SearchData);

  const maximo = contacts.length / porPagina;

  const getContactId = (id) => {
    setContactId(id);
  };

  const updateContact = async (
    nombre,
    razonSocial,
    nit,
    telefono,
    codigo,
    id
  ) => {
    const data = await updateContactOnServer(
      nombre,
      razonSocial,
      nit,
      telefono,
      codigo,
      id
    );
    console.log(data);
    setContacts((prev) => [
      ...contacts.filter((cont) => cont.id !== id),
      {
        nombre: data.nombre,
        razonSocial: data.razonSocial,
        nit: data.nit,
        telefono: data.telefono,
        codigo: data.codigo,
        id,
      },
    ]);
  };

  const deleteContact = async (id) => {
    const data = await deleteContactOnServer(id);
    if (data === null) {
      setContacts((prev) => [...contacts.filter((cont) => cont.id !== id)]);
    }
  };

  let selectContact = contacts.find((contact) => contact.id === contactId);

  return (
    <>
      <ToastContainer position="bottom-center" />
      <ModalComponent
        isOpen={isOpen}
        title={"Agrgar nuevo contacto"}
        onOpen={onOpen}
        onClose={onClose}
      >
        <ContactForm addNewContact={addNewContact} onClose={onClose} />
      </ModalComponent>

      <ModalComponent
        isOpen={isOpenEdit}
        title={"Editar contacto"}
        onOpen={onOpenEdit}
        onClose={onCloseEdit}
      >
        <ContactForm
          updateContact={updateContact}
          contact={selectContact}
          onClose={onCloseEdit}
        />
      </ModalComponent>

      <Box>
        <Flex p="4" justify="center" align="center">
          <Image src="/libreta.png" w="80px" h="70px" right="15px" />
          <Heading as="h1" textTransform="uppercase">
            Lista de contactos
          </Heading>
        </Flex>
        <Box p="4">
          <Button
            bg="blackAlpha.900"
            color="white"
            w="97%"
            fontSize="xl"
            fontWeight="bold"
            colorScheme="green"
            onClick={onOpen}
          >
            <AddIcon h="20px" w="20px" mr="4" /> Agregar Contacto
          </Button>
        </Box>
        <Box p="4">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              focusBorderColor="blackAlpha.900"
              type="tel"
              placeholder="Buscar Contacto..."
              onChange={(e) => setSearchData(e.target.value)}
            />
          </InputGroup>
        </Box>
        <Box className="scrollBar" p="4">
          {searchContacts
            .slice(
              (pagina - 1) * porPagina,
              (pagina - 1) * porPagina + porPagina
            )
            .map((contact) => (
              <div>
                <ContactCard
                  getContactId={getContactId}
                  onOpen={onOpenEdit}
                  contact={contact}
                  key={contact.id}
                  deleteContact={deleteContact}
                />
              </div>
            ))}
        </Box>
      </Box>
      <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo}/>
    </>
  );
}

export default App;

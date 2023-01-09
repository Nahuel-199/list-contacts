import React, { useState } from 'react'
import { Stack } from "@chakra-ui/layout";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
  } from "@chakra-ui/react";

const ContactForm = ({ addNewContact, onClose, contact, updateContact }) => {
    console.log(contact)
    const [nombre, setNombre] = useState(contact ? contact.nombre : "")
    const [razonSocial, setRazonSocial] = useState(contact ? contact.razonSocial : "")
    const [telefono, setTelefono] = useState(contact ? contact.telefono : "")
    const [nit, setNit] = useState(contact ? contact.nit : "")
    const [codigo, setCodigo] = useState(contact ? contact.codigo : "")

    const onSubmit = (e) => {
        e.preventDefault();
        if(contact){
           updateContact(nombre, razonSocial, telefono, nit, codigo, contact.id)
           onClose();
        } else {
       addNewContact(nombre, razonSocial, telefono, nit, codigo)
       onClose();
        }
    }

  return (
    <Stack>
    <FormControl id="nombre">
      <FormLabel>Nombre</FormLabel>
      <Input 
      type="text" 
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      />
    </FormControl>
    <FormControl id="razonSocial">
      <FormLabel>Razon Social</FormLabel>
      <Input 
      type="text" 
      value={razonSocial}
      onChange={(e) => setRazonSocial(e.target.value)}
      />
    </FormControl>
    <FormControl id="nit">
      <FormLabel>Nit</FormLabel>
      <Input 
      type="text" 
      value={nit}
      onChange={(e) => setNit(e.target.value)}
      />
    </FormControl>
    <FormControl id="telefono">
      <FormLabel>Telefono</FormLabel>
      <Input 
      type="text" 
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      />
    </FormControl>
    <FormControl id="codigo">
      <FormLabel>Codigo</FormLabel>
      <Input 
      type="text"
      value={codigo}
      onChange={(e) => setCodigo(e.target.value)}
       />
    </FormControl>
    {contact ? <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
      Editar Contacto
      </Button>
      :
      <Button onClick={onSubmit} colorScheme="purple" alignSelf="flex-end">
      Guardar
      </Button>}
  </Stack>
  )
}

export default ContactForm
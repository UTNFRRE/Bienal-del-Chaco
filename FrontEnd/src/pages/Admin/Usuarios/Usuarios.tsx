import React, { useEffect, useState } from "react";
import { GetUsuarios, GetRoles, AddRoltoUser } from "../../../API/Login";
import { Table, Thead, Tbody, Tr, Th, Td, Select, Flex } from "@chakra-ui/react";

type Usuario = {
    userName: string;
    roleName: string;
};

type Role = {
    description: string | null,
    id: string, 
    name: string, 
    normalizedName: string,
    concurrencyStamp: string | null,
}

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const data = await GetUsuarios();
            setUsuarios(data);
        };

        const fetchRoles = async () => {
            const rol = await GetRoles();
            setRoles(rol);
        };

        fetchRoles();
        fetchUsuarios();
    }, []);

    const handleRoleChange = async (index: number, newRole: string) => {
        const updatedUsuarios = [...usuarios];
        const usuario = updatedUsuarios[index];
        usuario.roleName = newRole;
        setUsuarios(updatedUsuarios);

        try {
            await AddRoltoUser(usuario.userName, newRole);
            const data = await GetUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error('Error al actualizar el rol del usuario:', error);
        }
    };

    return (
        <Flex justifyContent={'center'} alignItems={'center'}>
            <Flex 
            overflowX="auto"
            bg="secundaryBg"
            p={6}
            mt={8}
            boxShadow="md"
            w="80%"
            borderWidth={1}
            borderColor={'secundaryHover'}>
            <Table variant="striped" 
                colorScheme="secundaryBg"
                width="100%"
                size="sm" >
                <Thead>
                    <Tr>
                        <Th textAlign={'center'}>Nombre de Usuario</Th>
                        <Th textAlign={'center'}>Rol</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usuarios.map((usuario, index) => (
                        <Tr key={usuario.userName}>
                            <Td>{usuario.userName}</Td>
                            <Td>
                                <Select
                                    value={usuario.roleName}
                                    onChange={(e) => handleRoleChange(index, e.target.value)}
                                >
                                    {roles.map((role) => (
                                        <option key={role.name} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </Select>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            </Flex>
        </Flex>
    );
};

export default Usuarios;
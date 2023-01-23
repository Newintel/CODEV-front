import {
    Box,
    Button,
    FormControl,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Modal,
    Skeleton,
    Stack,
    Toast,
    VStack,
} from 'native-base';
import React, { useCallback } from 'react';
import { FetchResources, FetchResourcesCallback } from '../api/FetchResources';
import useNfcManager from '../hooks/useNfcManager';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface I_Props {
    onClose?: () => void;
    isOpen: boolean;
    isFetching: boolean;
    register: FetchResourcesCallback<FetchResources.SIGNUP>;
}

const RegisterModal = (props: I_Props) => {
    const { onClose, isOpen, register, isFetching } = props;

    const { readTag, readNfc, isReading } = useNfcManager();

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const onPress = useCallback(() => {
        if (email === '') {
            Toast.show({
                title: 'Email is required',
            });
            return;
        }

        if (email.includes('.') === false) {
            Toast.show({
                title: 'Email is invalid',
            });
            return;
        }

        if (password === '') {
            Toast.show({
                title: 'Password is required',
            });
            return;
        }

        register({
            email: `${email}@etu.univ-lyon1.fr`,
            password,
            nfc: readTag?.id,
        });
    }, [email, password, register, readTag]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content>
                <Modal.CloseButton />
                <Modal.Header>Register</Modal.Header>
                <Modal.Body>
                    <VStack mx={'auto'} alignSelf={'center'} width="90%">
                        <FormControl isRequired isInvalid mb={2}>
                            <FormControl.Label>
                                Student email address
                            </FormControl.Label>
                            <Stack>
                                <InputGroup>
                                    <Input
                                        w={{
                                            base: '60%',
                                            md: '100%',
                                        }}
                                        placeholder="fisrtname.lastname"
                                        backgroundColor={'white'}
                                        onChangeText={setEmail}
                                    />
                                    <InputRightAddon
                                        w={{
                                            base: '40%',
                                            md: '100%',
                                        }}
                                        children={'@etu.univ-lyon1.fr'}
                                    />
                                </InputGroup>
                            </Stack>
                        </FormControl>
                        <FormControl isRequired isInvalid mb={4}>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                w={{
                                    base: '100%',
                                }}
                                type="password"
                                placeholder="Enter your password"
                                backgroundColor={'white'}
                                onChangeText={setPassword}
                            />
                        </FormControl>
                        <HStack>
                            <Skeleton
                                isLoaded={isFetching === false}
                                width={'75%'}>
                                <Button
                                    colorScheme="primary"
                                    onPress={readNfc}
                                    mr="3"
                                    width={'75%'}>
                                    {isReading
                                        ? 'Stop reading'
                                        : 'Read student card'}
                                </Button>
                            </Skeleton>
                            <Box>
                                <Icon
                                    name={
                                        readTag?.id
                                            ? 'check-bold'
                                            : 'close-thick'
                                    }
                                    size={40}
                                    color={readTag?.id ? 'green' : 'red'}
                                />
                            </Box>
                        </HStack>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Skeleton isLoaded={isFetching === false}>
                        <Button colorScheme="primary" onPress={onPress}>
                            Register
                        </Button>
                    </Skeleton>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

export default RegisterModal;

import {
    Box,
    Button,
    Center,
    Divider,
    FormControl,
    Heading,
    Input,
    InputGroup,
    InputRightAddon,
    Square,
    Stack,
    View,
    VStack,
} from 'native-base';
import React from 'react';

interface I_Props {
    onLogin: (success: boolean) => void;
}

const Login = (props: I_Props) => {
    const { onLogin } = props;

    return (
        <View flex={1} backgroundColor={'blue.100'}>
            <Square mx="auto" height={'25%'}>
                <Heading>Welcome to our app!</Heading>
            </Square>
            <Box height={'55%'}>
                <Center flex={1}>
                    <Box>
                        <Heading mb="3" mx="auto">
                            Login with your E-Mail address...
                        </Heading>
                        <VStack mx={'auto'} alignSelf={'center'} width="90%">
                            <FormControl isRequired isInvalid>
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
                            <FormControl isRequired isInvalid>
                                <FormControl.Label>Password</FormControl.Label>
                                <Input
                                    w={{
                                        base: '100%',
                                    }}
                                    type="password"
                                    placeholder="Enter your password"
                                    backgroundColor={'white'}
                                />
                            </FormControl>
                        </VStack>
                    </Box>
                    <Divider my="5" />
                    <Box>
                        <Heading mb="3" mx="auto">
                            ... or with your student card
                        </Heading>
                        <Button
                            colorScheme="primary"
                            onPress={() => {
                                console.log('hello');
                            }}>
                            Login with student card
                        </Button>
                    </Box>
                </Center>
            </Box>
        </View>
    );
};

export default Login;

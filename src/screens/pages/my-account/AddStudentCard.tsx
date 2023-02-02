import {
    AlertDialog,
    Button,
    CheckIcon,
    Heading,
    HStack,
    View,
} from 'native-base';
import React, { useEffect, useRef } from 'react';
import useNfcManager from '../../../hooks/useNfcManager';
import useFetchResources from '../../../hooks/useFetchResources';
import { FetchResources, Methods } from '../../../api/FetchResources';
import { useCallback } from 'react';
import { Spinner } from 'native-base';

const AddStudentCard = () => {
    const { readTag, isReading, readNfc, stopReading } = useNfcManager();

    const { fetchData: addCard } = useFetchResources({
        resource: FetchResources.ADD_CARD,
        method: Methods.PUT,
    });

    const [isOpen, setIsOpen] = React.useState(false);

    const ref = useRef(null);

    const onClose = useCallback(() => setIsOpen(false), []);

    useEffect(() => {
        if (readTag?.id) {
            addCard({
                nfc: readTag.id,
            });
        }
    }, [addCard, readTag?.id]);

    return (
        <View alignItems={'center'}>
            <AlertDialog isOpen={isOpen} leastDestructiveRef={ref}>
                <AlertDialog.Content>
                    <AlertDialog.Header>Are you sure?</AlertDialog.Header>
                    <AlertDialog.Body>
                        This might override your current registered student card
                    </AlertDialog.Body>
                    <AlertDialog.Footer>
                        <Button.Group variant="ghost" space={2}>
                            <Button onPress={onClose}>Cancel</Button>
                            <Button
                                onPress={() => {
                                    readNfc();
                                    onClose();
                                }}
                                colorScheme="red"
                                ref={ref}>
                                Add
                            </Button>
                        </Button.Group>
                    </AlertDialog.Footer>
                </AlertDialog.Content>
            </AlertDialog>
            <Heading mb="3">Student card</Heading>
            <HStack>
                <Button
                    onPress={isReading ? stopReading : () => setIsOpen(true)}>
                    {isReading ? 'Stop reading' : 'Add / Modify student card'}
                </Button>
                {readTag?.id && <CheckIcon size={39} color="green.500" />}
                {isReading && <Spinner />}
            </HStack>
        </View>
    );
};

export default AddStudentCard;

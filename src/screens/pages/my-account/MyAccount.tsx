import { Divider, ScrollView } from 'native-base';
import React from 'react';
import AddStudentCard from './AddStudentCard';

import UserModifyForm from './UserModifyForm';

const MyAccount = () => {
    return (
        <ScrollView>
            <UserModifyForm />
            <Divider my="5" />
            <AddStudentCard />
        </ScrollView>
    );
};

export default MyAccount;

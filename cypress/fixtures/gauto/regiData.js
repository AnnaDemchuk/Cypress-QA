export const regiData = {
    name: {
        empty: undefined,
        short: 'A',
        long: 'A'.repeat(21),
        valid_3_sign: 'Emi',
        valid_20_sign: 'A'.repeat(20),
        invalid_name_with_numbers: 'John123',
        message_empty: 'Name required',
        message_length: 'Name has to be from 2 to 20 characters long',
        message_invalid: 'Name is invalid'
    },

    last_name: {
        empty: undefined,
        short: 'A',
        long: 'A'.repeat(21),
        valid_3_sign: 'Emi',
        valid_20_sign: 'A'.repeat(20),
        invalid_name_with_numbers: 'John123',
        message_empty: 'Last name required',
        message_length: 'Last name has to be from 2 to 20 characters long',
        message_invalid: 'Last name is invalid'
    },

    password: {
        empty: undefined,
        short: 'A',
        long: 'Qw' + '1'.repeat(14),
        valid_8_sign: 'Qw' + '1'.repeat(6),
        valid_15_sign: 'Qw' + '1'.repeat(13),
        message_empty: 'Password required',
        message_length: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
    },

     confirm_password: {
        password: 'Qw' + '1'.repeat(6),
        re_enter_password: 'Qw' + '1'.repeat(7),
        long: 'Qw' + '1'.repeat(14),
        message_empty: 'Re-enter password required',
        message_not_match: 'Passwords do not match',
    }
};


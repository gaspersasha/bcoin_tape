export const login_codes = {
    en: {
        BE_login_request_failure : 'Invalid name or password',
        FE_login_empty_name : 'Name can not be emty',
        FE_login_empty_pass : 'Password can not be emty',
        FE_login_invalid_name : 'Name is invalid',
        FE_login_invalid_pass : 'Password is invalid',
    }
};

export const login_recovery_codes = {
    en: {
        BE_login_recovery_request_failure : 'Recovery code is not recogonozed',
    }
};

export const user_change_pass_codes = {
    en: {
        //fail
        BE_user_change_pass_failure : 'Invalid data',
        BE_user_change_pass_wrong_current : 'Wrong current password',
        BE_user_change_pass_no_user : 'No user found',
        FE_user_change_pass_empty_pass : 'Password can not be emty',
        FE_user_change_pass_no_math : 'Passwords do not match',
        FE_user_change_pass_invalid_pass : 'Password should consist from 6 to 40 characters',
        //success
        FE_user_change_pass_success : `New password was successfully created`,
    }
};

export const sign_up_codes = {
    en: {
        BE_sign_up_request_failure : 'Invalid user data. Name can contaqin only english letters, numbers and non-word symbols (_,!,@,#,$,£,€,%,^,&,*,(,),+,=) without space. Password should consist from 7 to 40 characters which contain at least one numeric digit and a special character (!,@,#,%,&,*,?,£).',
        BE_sign_up_user_exists : 'We are sorry, but user with this name alredy exists. Please enter another one.',
        BE_sign_up_user_error : 'Internal erorr has occured. Please try again later.',
        FE_sign_up_empty_name : 'Name can not be emty',
        FE_sign_up_empty_pass : 'Password can not be emty',
        FE_sign_up_pass_no_math : 'Passwords do not match',
        FE_sign_up_invalid_name_length : 'Invalid name length. Name shoud consist from 3 to 15 characters.',
        FE_sign_up_invalid_name : 'Name can contaqin only english letters, numbers and non-word (_,!,@,#,$,£,€,%,^,&,*,(,),+,=) symbols without space.',
        FE_sign_up_invalid_pass : 'Password should consist from 7 to 40 characters which contain at least one numeric digit and a special character (_,!,@,#,$,£,€,%,^,&,*,(,),+,=).',
        FE_sign_up_invalid_email : 'Email is invalid',
    }
};

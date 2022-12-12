import Languages from 'commons/languages';
import { Button } from 'components/button';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate();

    const onPress = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    return (
        <div>
            <p>
                Profile
            </p>

            <Button
                label={Languages.common.back}
                onPress={onPress}
                buttonStyle={'GREEN'}
            />
        </div>
    );
}

export default Profile;

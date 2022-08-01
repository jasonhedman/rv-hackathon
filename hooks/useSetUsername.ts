import { useState } from 'react';
import { useMoralis } from 'react-moralis';

const useSetUsername = () => {

    const { user } = useMoralis();

    const [username, setUsername] = useState<string>(user?.getUsername() || "");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    }

    const onSubmit = async () => {
        user?.setUsername(username);
        await user?.save();
    }
    
    return {
        username,
        handleChange,
        onSubmit,
    }
}

export default useSetUsername;
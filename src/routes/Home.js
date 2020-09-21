import React, { useState } from 'react';

const Home = () => {

    const [nweet, setNweet] = useState("");

    const onSubmit = (event) => {

        event.preventDefault();


    };

    const onChange = (event) => {

        const {target: {value},} = event;

        setNweet(value);

    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="쓸 말" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
        </div>
    )
}

export default Home;
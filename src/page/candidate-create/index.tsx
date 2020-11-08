import React, {useState} from 'react';
import {post} from "../../utils/fetch";

export const CandidateCreate = (props) => {
    const [name, setName] = useState('');
    const [education, setEducation] = useState('');
    const [contact, setContact] = useState('');

    return (
        <div>
            <div>
                <h1>Create Candidate</h1>
            </div>
            <div>
                <p>name</p>
                <textarea
                    onChange={(e) => {
                        setName(e.target.value)
                    }}
                    value={name}
                    rows={5}
                    cols={30}
                />
            </div>
            <div>
                <p>education</p>
                <textarea
                    onChange={(e) => {
                        setEducation(e.target.value)
                    }}
                    value={education}
                    rows={5}
                    cols={30}
                />
            </div>
            <div>
                <p>contact</p>
                <textarea
                    onChange={(e) => {
                        setContact(e.target.value)
                    }}
                    value={contact}
                    rows={5}
                    cols={30}
                />
            </div>
            <div>
                <p></p>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        post('/candidate', {
                            status: 1,
                            name,
                            education,
                            contact,
                            attach: 'https://www.google.com/'
                        }).then(() => {
                            props.history.push('/home');
                        })
                        // TODO: error handling
                    }}
                >
                    Submit
                </button>
            </div>
            <div>
                <p></p>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => {
                        props.history.push('/home');
                    }}
                >
                    Cancel
                </button>
            </div>
        </div>

    );
}

const AuthPageCardWrapper = ({ children }) => {
    return (
        <div className="w-full  px-6  flex flex-col items-center">
            {children}
        </div>
    );
};

const AuthPageInputTag = ({ title }) => {
    return (
        <div className="w-2/3 flex items-center justify-between ml-5">
            <div className="text-lg font-bold self-start text-commomTextColor mb-1">
                {title}
            </div>
        </div>
    );
};

const AuthPageInput = ({
    inputs,
    name,
    type = "text",
    placeholder,
    onChangeHandler,
}) => {
    return (
        <>
            <input
                className="w-2/3 p-3 rounded-md"
                name={name}
                type={type}
                placeholder={placeholder}
                value={inputs.name}
                onChange={onChangeHandler}
            />
        </>
    );
};

export const AuthenticationInputCard = ({
    inputs,
    name,
    title,
    placeholder,
    onChangeHandler,
    type,
}) => {
    return (
        <AuthPageCardWrapper>
            <AuthPageInputTag title={title} />
            <AuthPageInput
                inputs={inputs}
                name={name}
                type={type}
                placeholder={placeholder}
                onChangeHandler={onChangeHandler}
            />
        </AuthPageCardWrapper>
        // <div className="w-full  px-6  flex flex-col items-center">
        //     <div className="w-2/3 flex items-center justify-between ml-5">
        //         <div className="text-lg font-bold self-start  mb-1">
        //             {title}
        //         </div>
        //     </div>
        //     <input
        //         className="w-2/3 p-3 rounded-md"
        //         type="text"
        //         placeholder={body}
        //         value={inputs.username}
        //         onChange={onChangeHandler}
        //     />
        // </div>
    );
};

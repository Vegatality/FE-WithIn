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
    value,
    name,
    type = "text",
    placeholder,
    onChangeHandler,
}) => {
    return (
        <>
            <input
                className="w-2/3 p-3 rounded-md outline-none focus:ring-2 focus: ring-mainPurple"
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
            />
        </>
    );
};

export const AuthenticationInputCard = ({
    value,
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
                value={value}
                name={name}
                type={type}
                placeholder={placeholder}
                onChangeHandler={onChangeHandler}
            />
        </AuthPageCardWrapper>
    );
};

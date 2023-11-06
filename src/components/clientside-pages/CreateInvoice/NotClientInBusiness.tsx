export const NotClientInBusiness = ({ handle }: NotClientInBusinessProps) => {
    const { username, businessSelected } = handle;
    return (
        <div className=" flex items-center justify-center h-screen w-full">
            <h2 className="text-lg">
                <span className="font-bold">{username}</span> no pertenece a{" "}
                <span className="underline ">{businessSelected.name}</span>
            </h2>
        </div>
    );
};

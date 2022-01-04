import React from "react";

const ErrorPage = ({err}) => {
    return (
        <div>
            <h1>
                There was an error {err}
            </h1>
        </div>
    )
}

export default ErrorPage;
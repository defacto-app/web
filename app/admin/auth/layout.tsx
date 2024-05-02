
import PropTypes from "prop-types";



export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div

        >

            {children}


        </div>
    );
}

RootLayout.propType = {
    children: PropTypes.node,
    layout: PropTypes.string,
};


export const runtime = 'edge';



import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import { Head } from "@inertiajs/react";

const ContactLayout = (params) => {
  
    return (
        <>
            <AuthenticatedLayout
                user={params.auth}
                globalVars={params.globalVars}
            >
                <Head title="Contacto" />
                <Contact
                    info={params.info}
                    globalVars={params.globalVars}
                ></Contact>
            </AuthenticatedLayout>
        </>
    );
};

export default ContactLayout;

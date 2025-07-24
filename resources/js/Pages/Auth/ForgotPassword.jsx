import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ForgotPassword(params) {
    const [email, setEmail] = useState("");

    const submit = (e) => {
        e.preventDefault();
        axios
            .get(`/searchemailuser/${email}`)
            .then((response) => {
                if (response.data == "no existe") {
                     sweetAlert("Correo no encontrado!", "warning", 2000)
                } else {
                     sweetAlert(response.data, "success", 3000)
                }
            })
            .catch((error) => {
                sweetAlert(error, "error", 2000)
                console.log(error);
            });
    };

    function sweetAlert(mensaje, icono, duracion) {
        Swal.fire({
            title: mensaje,
            icon: icono,
            timer: duracion,
            showConfirmButton: false,
        });
    }

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>
            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ml-4">
                        Email Password Reset Link
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}

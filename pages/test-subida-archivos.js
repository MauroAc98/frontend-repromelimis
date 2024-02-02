import useCustomForm from "@/base/hooks/useCustomForm"
import Form from "@/project/components/TestSubidaArchivos/Form"
import TableSimple from "@/project/components/TestSubidaArchivos/TableSimple";
import { useEffect, useState } from "react";

export default function TestSubidaArchivos() {
    const [content, setContent] = useState('list');
    const [formAction, setFormAction] = useState('');
    const { formData, handleFormChange, setFormData } = useCustomForm();

    return (
        <>
            <div className="p-5">
                {(content == 'form') && (
                    <Form
                        formData={formData}
                        handleFormChange={handleFormChange}
                        setFormData={setFormData}
                        setContent={setContent}
                        formAction={formAction}
                    />
                )}

                {(content == 'list') && (
                    <TableSimple
                        setFormData={setFormData}
                        setContent={setContent}
                        setFormAction={setFormAction}
                    />
                )}
            </div>
        </>
    )
}
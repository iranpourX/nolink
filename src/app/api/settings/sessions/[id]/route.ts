import {NextRequest, NextResponse} from 'next/server';
import api from "@/app/lib/client";

export async function DELETE(req: NextRequest, {params}: { params: { id: string } }) {
    const {id} = params

    try {
        const response = await api(`account/remove-session/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // در jsonplaceholder، DELETE همیشه موفقه و response بدنه نداره.
        if (!response.ok) {
            return NextResponse.json(
                {error: 'خطا در حذف از API خارجی'},
                {status: response.status}
            );
        }

        return NextResponse.json({
            message: `آیتم با id ${id} از API خارجی حذف شد.`,
        })
    } catch (error) {
        return NextResponse.json(
            {error: 'خطای شبکه یا سرور'},
            {status: 500}
        )
    }
}

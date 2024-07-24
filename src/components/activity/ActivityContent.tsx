import { ChangeEventHandler } from "react";

interface ActivityContentProps {
    actionInput: ChangeEventHandler<HTMLInputElement>,
    activity: {
        id: string,
        title: string,
        date: string,
        finally: boolean
    }
}

export function ActivityContent({ actionInput, activity }: ActivityContentProps) {
    return (
        <div className='relative flex-1'>
            <input
                onChange={actionInput}
                type="checkbox"
                checked={activity.finally}
                value={activity.id}
                className='w-full absolute inset-0 $'
            />
            <div className="flex justify-between">
                <div className="flex gap-3">
                    {activity.finally ? (
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" fill="#4f46e5" stroke="#4f46e5" />
                            <mask id="path-2-inside-1_0_1" fill="white">
                                <path d="M10.9978 18.6488L6.00002 13.7476L15.5593 4L20.5571 8.90124L10.9978 18.6488Z" />
                            </mask>
                            <path d="M10.9978 18.6488L9.59745 20.0767L11.0254 21.4771L12.4257 20.0491L10.9978 18.6488ZM12.3982 17.2209L7.40037 12.3196L4.59966 15.1755L9.59745 20.0767L12.3982 17.2209ZM19.1291 7.50089L9.56986 17.2484L12.4257 20.0491L21.985 10.3016L19.1291 7.50089Z" fill="#F7F7F7" mask="url(#path-2-inside-1_0_1)" />
                        </svg>
                    ) : (
                        <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="25" height="25" rx="1.5" stroke="#4f46e5" />
                        </svg>
                    )}
                    <h2 className='w-36 sm:w-auto'>{activity.title}</h2>
                </div>
            </div>
        </div>
    )
}
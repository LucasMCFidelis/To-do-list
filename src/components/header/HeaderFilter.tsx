interface HeaderFiltersProps{
    filter: string
    actionFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export function HeaderFilter({filter, actionFilter}: HeaderFiltersProps ){
    return (
        <div>
            <select
                value={filter}
                onChange={actionFilter}
                className='h-9 w-22 flex items-center justify-center px-2 bg-indigo-600 hover:bg-indigo-700 text-zinc-200 rounded-xl cursor-pointer outline-none'>
                <option
                    value=""
                    className='text-indigo-600 bg-zinc-200'
                >
                    ALL
                </option>
                <option
                    value="Complete"
                    className='text-indigo-600 bg-zinc-200'
                >
                    Complete
                </option>
                <option
                    value="Incomplete"
                    className='text-indigo-600 bg-zinc-200'
                >
                    Incomplete
                </option>
            </select>
        </div>
    )
}
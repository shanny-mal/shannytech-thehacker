export default function SearchBar({
   className,
   mobile,
   placeholder = 'Search…',
}: {
   className?: string;
   mobile?: boolean;
   placeholder?: string;
}) {
   return (
      <div className={className}>
         <div
            className={
               mobile ? 'rounded border p-1' : 'rounded border p-1 bg-white'
            }
         >
            <input
               aria-label="Search"
               className="px-2 py-1 text-sm w-full bg-transparent outline-none"
               placeholder={placeholder}
            />
         </div>
      </div>
   );
}

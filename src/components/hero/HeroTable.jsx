const jumboTable = [
  { head: "name", data: "Carlo Alberto Falanga" },
  { head: "role", data: "Junior Web Developer" },
  { head: "based in", data: "Italy" },
  { head: "currently", data: "Boolean Student" },
];

export default function HeroTable() {
  return (
    <table className="block">
      <tbody className="block">
        {jumboTable.map((row) => {
          return (
            <tr
              className="block grid grid-cols-2 border-t border-[var(--line)] last:border-b py-4"
              key={row.head}
            >
              <th className="text-left font-mono uppercase font-light tracking-[0.08em] text-[11px] text-[var(--dim)]">
                {row.head}
              </th>
              <td className="text-left font-medium text-sm text-[14px]">{row.data}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

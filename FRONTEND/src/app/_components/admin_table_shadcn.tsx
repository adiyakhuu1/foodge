import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TableCard = () => {
  return (
    <TableRow className="border border-border bg-background">
      <TableCell>
        <div className="p-4">
          <input type="checkbox" />
        </div>
      </TableCell>
      <TableCell>1</TableCell>
      <TableCell>Amgalan</TableCell>
      <TableCell>2 foods</TableCell>
      <TableCell>2024/12/20</TableCell>
      <TableCell>45000</TableCell>
      <TableCell>
        <div className="truncate w-40">
          2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг+ Sbd negdsen emneleg |
          100 айлын гүүрэн гарцны хойд талд 4д ногоонСБД, 12-р хороо, СБД
          нэгдсэн эмнэлэг Sbd negdsen emneleg | 100 айлын гүүрэн гарцны хойд
          талд 4д ногоон20
        </div>
      </TableCell>
      <TableCell>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a state" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>State</SelectLabel>
              <SelectItem value="PENDING">PENDING</SelectItem>
              <SelectItem value="DELIVERED">DELIVERED</SelectItem>
              <SelectItem value="CANCELLED">CANCELLED</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </TableCell>
    </TableRow>
  );
};

export default function TableShadcn() {
  return (
    <Table>
      {/* <TableCaption>The caption</TableCaption> */}
      <TableHeader className="bg-secondary">
        <TableRow>
          <TableHead>
            <div className="p-4 w-[4%]">
              <input type="checkbox" />
            </div>
          </TableHead>
          <TableHead>№</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Food</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Delivery Address</TableHead>
          <TableHead>Delivery State</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
        <TableCard />
      </TableBody>
    </Table>
  );
}

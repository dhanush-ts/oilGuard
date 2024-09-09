import { Barchart } from "../charts/finance/Barchart"
import { LineChart } from "../charts/finance/LineChart"
import { Table } from "../charts/finance/Table"

export const FinancialDash = () =>  {

  return (
    <div>

      <Barchart />
      <LineChart />
      <Table />

    </div>
  )
}
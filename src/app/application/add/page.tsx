import AddActivityForm from "../../../components/add/AddActivityForm";


export default function Add() {
  return (
    <main className="bg-background-1 min-h-screen p-4 mt-16">
      <h1 className="text-purple">Add activity</h1>
      <div className="flex flex-col gap-4">
        <AddActivityForm />
      </div>
    </main>
  );
}

export function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 text-center">
      <p className="font-medium">Erreur</p>
      <p className="text-sm mt-1">{message}</p>
    </div>
  );
}

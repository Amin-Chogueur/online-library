import { formatCurency } from "../../helpers/formatCurency";

type OrderItem = {
  _id: string;
  bookId: string;
  title: string;
  category: string;
  price: number;
  quantityInCart: number;
};

type Customer = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
};

export type Order = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  totalAmount: number;
  status: string;
  customer: Customer;
  items: OrderItem[];
};

type OrderConfirmationProps = {
  createdOrder: Order | undefined;
  message: string;
};

function OrderConfirmation({ createdOrder, message }: OrderConfirmationProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-950 shadow rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-green-600">
        Commande confirmée
      </h2>
      <p className="mb-4 text-gray-300  font-bold whitespace-pre-line">
        {message}
      </p>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Détails du client
        </h3>
        <p>
          <strong>Nom :</strong> {createdOrder?.customer.fullName}
        </p>
        <p>
          <strong>Email :</strong> {createdOrder?.customer.email}
        </p>
        <p>
          <strong>Téléphone :</strong> {createdOrder?.customer.mobile}
        </p>
        <p>
          <strong>Adresse :</strong> {createdOrder?.customer.address}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-green-600 mb-2">
          Articles commandés
        </h3>
        <ul className="divide-y divide-gray-200">
          {createdOrder?.items.map((item) => (
            <li key={item._id} className="py-2">
              <p>
                <strong>Titre :</strong> {item.title}
              </p>
              <p>
                <strong>Catégorie :</strong> {item.category}
              </p>
              <p>
                <strong>Quantité :</strong> {item.quantityInCart}
              </p>
              <p>
                <strong>Prix unitaire :</strong> {formatCurency(item.price)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-right">
        <p className="text-xl font-bold">
          Total : {formatCurency(createdOrder?.totalAmount as number)}
        </p>
        <p className="text-sm text-gray-500">Statut : {createdOrder?.status}</p>
        <p className="text-sm text-gray-500">
          Date :{" "}
          {createdOrder?.createdAt &&
            new Date(createdOrder.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default OrderConfirmation;

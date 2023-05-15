import { CheckIcon, DeleteIcon, EditIcon } from "components/Icons/Icons";
import React, { FunctionComponent, useState } from "react";

import { ApartmentOffer } from "types/common";
import { GetServerSideProps } from "next";
import getOffersForAdmin from "services/offers/allForAdmin";
import { getSession } from "next-auth/react";
import { jsonFetcher } from "utils";
import { loadingState } from "atoms/atoms";
import { useSetRecoilState } from "recoil";

interface AdminPanelProps {
  offers: Array<ApartmentOffer>;
  offset: string;
}

const AdminPanel: FunctionComponent<AdminPanelProps> = ({ offers, offset }) => {
  const [currentOffers, setCurrentOffers] =
    useState<Array<ApartmentOffer>>(offers);
  const [currentOffset, setCurrentOffset] = useState(offset);
  const setLoadingState = useSetRecoilState(loadingState);

  const loadMore = async () => {
    const response = await jsonFetcher(
      `/api/offers/paginate?offset=${currentOffset}`
    );

    setCurrentOffset(response.offset);
    setCurrentOffers([...currentOffers, response.offers]);
  };

  const deleteOffer = async (id: number) => {
    setLoadingState({ isLoading: true, message: "" });
    const response = await fetch(`/api/offers/${id}`, { method: "DELETE" });

    if (response.ok) {
      setLoadingState({ isLoading: false, message: "" });

      const updatedOffers = currentOffers.filter(offer => offer.id !== id);

      setCurrentOffers(updatedOffers);
    }
  };
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-white rounded-md border-gray-700 border">
          <thead className="text-xs text-white uppercase bg-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentOffers.map(offer => (
              <tr
                className="border-b border-yellow hover:opacity-80"
                key={offer.id}
              >
                <th scope="row" className="px-6 py-4 font-medium text-white">
                  {offer.title}
                </th>
                <td className="px-6 py-4">{offer.location}</td>
                <td className="px-6 py-4">{offer.category}</td>
                <td className="px-6 py-4 cursor-pointer">
                  <span
                    className={`rounded-md bg-${
                      offer.status === "active" ? "green" : "red"
                    } p-2`}
                  >
                    {offer.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-1">
                  <CheckIcon />
                  <EditIcon />
                  <DeleteIcon onClick={() => deleteOffer(offer.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  if (!session || session.user.role !== "admin") {
    return {
      notFound: true,
    };
  }
  const offers = await getOffersForAdmin();

  return {
    props: {
      offset: offers.offset ?? null,
      offers: offers.records.map(
        (offer: { fields: ApartmentOffer }) => offer.fields
      ),
    },
  };
};

export default AdminPanel;

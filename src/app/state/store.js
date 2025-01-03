import { create } from "zustand";

const useTicketStore = create((set) => ({
  vipTickets: 0,
  regularTickets: 0,
  VipPrice: 1299,
  RegularPrice: 799,
  totalPrice: 0,
  reservation: 99,
  goGreen: false,

  toggleGoGreen: () =>
    set((state) => ({
      goGreen: !state.goGreen,
    })),

  increaseTicket: (type) =>
    set((state) => {
      if (type === "VIP") {
        const newVipTickets = state.vipTickets + 1;
        return {
          vipTickets: newVipTickets,
          totalPrice: newVipTickets * state.VipPrice + state.regularTickets * state.RegularPrice,
        };
      }
      if (type === "Regular") {
        const newRegularTickets = state.regularTickets + 1;
        return {
          regularTickets: newRegularTickets,
          totalPrice: state.vipTickets * state.VipPrice + newRegularTickets * state.RegularPrice,
        };
      }
    }),
  decreaseTicket: (type) =>
    set((state) => {
      if (type === "VIP" && state.vipTickets > 0) {
        const newVipTickets = state.vipTickets - 1;
        return {
          vipTickets: newVipTickets,
          totalPrice: newVipTickets * state.VipPrice + state.regularTickets * state.RegularPrice,
        };
      }
      if (type === "Regular" && state.regularTickets > 0) {
        const newRegularTickets = state.regularTickets - 1;
        return {
          regularTickets: newRegularTickets,
          totalPrice: state.vipTickets * state.VipPrice + newRegularTickets * state.RegularPrice,
        };
      }
      return { ...state };
    }),

  selectedSpot: null,
  twoPersonTentCount: 0,
  threePersonTentCount: 0,
  tentPrices: { "2-person": 299, "3-person": 399 },
  totalTentPrice: 0,

  selectSpot: (spot) => set({ selectedSpot: spot }),

  increaseTent: (type) =>
    set((state) => {
      const totalTickets = state.vipTickets + state.regularTickets;

      if (type === "2-person" && state.twoPersonTentCount * 2 + state.threePersonTentCount * 3 < totalTickets) {
        return {
          twoPersonTentCount: state.twoPersonTentCount + 1,
          totalTentPrice: state.totalTentPrice + state.tentPrices["2-person"],
        };
      }
      if (type === "3-person" && state.twoPersonTentCount * 2 + state.threePersonTentCount * 3 < totalTickets) {
        return {
          threePersonTentCount: state.threePersonTentCount + 1,
          totalTentPrice: state.totalTentPrice + state.tentPrices["3-person"],
        };
      }
      return state;
    }),

  decreaseTent: (type) =>
    set((state) => {
      if (type === "2-person" && state.twoPersonTentCount > 0) {
        return {
          twoPersonTentCount: state.twoPersonTentCount - 1,
          totalTentPrice: state.totalTentPrice - state.tentPrices["2-person"],
        };
      }
      if (type === "3-person" && state.threePersonTentCount > 0) {
        return {
          threePersonTentCount: state.threePersonTentCount - 1,
          totalTentPrice: state.totalTentPrice - state.tentPrices["3-person"],
        };
      }
      return state;
    }),
}));

export default useTicketStore;

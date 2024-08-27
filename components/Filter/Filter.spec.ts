import { ref } from 'vue';
import { describe, it, expect, vi } from 'vitest';

describe('Dropdown Functions', () => {
  const options = ref([
    { label: "Menor Preço", value: "pricePerNight" },
    { label: "Maior Avaliações", value: "stars" },
  ]);

  const isOpen = ref(false);
  const selectedLabel = ref("Selecione uma opção");
  const selectedValue = ref<string | null>(null);
  const props = {
    listFilter: [
      { pricePerNight: 300, stars: 3 },
      { pricePerNight: 200, stars: 5 },
      { pricePerNight: 100, stars: 4 },
    ],
  };

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };

  const selectOption = (option: { label: string; value: string }) => {
    selectedLabel.value = option.label;
    selectedValue.value = option.value;
    isOpen.value = false;
    sortHotels(option.value);
  };

  const sortHotels = (value: string) => {
    if (value === "pricePerNight") {
      props.listFilter?.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (value === "stars") {
      props.listFilter?.sort((a, b) => b.stars - a.stars);
    }
  };

  it('should toggle the dropdown open and close', () => {
    toggleDropdown();
    expect(isOpen.value).toBe(true);

    toggleDropdown();
    expect(isOpen.value).toBe(false);
  });

  it('should select an option and close the dropdown', () => {
    const option = { label: "Menor Preço", value: "pricePerNight" };

    selectOption(option);

    expect(selectedLabel.value).toBe(option.label);
    expect(selectedValue.value).toBe(option.value);
    expect(isOpen.value).toBe(false);
  });

  it('should sort hotels by pricePerNight when price option is selected', () => {
    const originalList = [...props.listFilter];

    sortHotels("pricePerNight");

    expect(props.listFilter).toEqual([
      { pricePerNight: 100, stars: 4 },
      { pricePerNight: 200, stars: 5 },
      { pricePerNight: 300, stars: 3 },
    ]);

    props.listFilter = originalList;
  });

  it('should sort hotels by stars when stars option is selected', () => {
    const originalList = [...props.listFilter];

    sortHotels("stars");

    expect(props.listFilter).toEqual([
      { pricePerNight: 200, stars: 5 },
      { pricePerNight: 100, stars: 4 },
      { pricePerNight: 300, stars: 3 },
    ]);

    props.listFilter = originalList;
  });
});

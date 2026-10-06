"use client";

import ThemeBtnOne from "@/app/components/ThemeBtnOne";
import React, { useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiRotateCcw,
  FiStar,
} from "react-icons/fi";
import { useGetSizeQuery } from "../../../store/sizeApi";
import { useGetColorsQuery } from "@/store/colorsApi";
import { useGetMaterialQuery } from "@/store/materialApi";
import { DEFAULT_FILTERS, toArray, type Filters } from "./filterUtils";

type ColorItem = {
  _id?: string;
  id?: string;
  colorName?: string;
  name?: string;
  colorCode?: string;
  hexCode?: string;
};

type MaterialItem = {
  _id?: string;
  id?: string;
  material?: string;
  materialName?: string;
  name?: string;
};

type SizeItem = {
  _id?: string;
  id?: string;
  size?: string;
  sizeName?: string;
  name?: string;
};

interface SideFilterProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

/* Reusable collapsible section */
const Section = ({
  title,
  last = false,
  children,
}: {
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={last ? "" : "border-b border-gray-100 dark:border-gray-800"}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="text-[12px] font-bold text-black dark:text-white">
          {title}
        </span>
        {open ? (
          <FiChevronUp size={14} className="text-gray-500 dark:text-gray-400" />
        ) : (
          <FiChevronDown
            size={14}
            className="text-gray-500 dark:text-gray-400"
          />
        )}
      </button>
      {open && children}
    </div>
  );
};

const toggleItem = (list: string[], value: string) =>
  list.includes(value) ? list.filter((i) => i !== value) : [...list, value];

const chipClass = (selected: boolean) =>
  `cursor-pointer rounded-lg border text-[10px] font-bold transition-all duration-200 ${
    selected
      ? "border-[#ffd83d] bg-[#ffd83d] text-black"
      : "border-gray-200 bg-white text-gray-600 hover:border-[#ffd83d] dark:border-gray-700 dark:bg-[#1d1d1d] dark:text-gray-300 dark:hover:border-[#ffd83d]"
  }`;

const SideFilter = ({ filters, onChange }: SideFilterProps) => {
  /* API */
  const { data: sizeResponse } = useGetSizeQuery();
  const { data: colorResponse } = useGetColorsQuery();
  const { data: materialResponse } = useGetMaterialQuery();

  const apiSizes = toArray<SizeItem>(sizeResponse);
  const apiColors = toArray<ColorItem>(colorResponse);
  const apiMaterials = toArray<MaterialItem>(materialResponse);

  /* Price inputs (typed values, applied on button click) */
  const [minInput, setMinInput] = useState(String(filters.minPrice));
  const [maxInput, setMaxInput] = useState(String(filters.maxPrice));

  /* Helpers */
  const getColorName = (c: ColorItem) => c.colorName || c.name || "Color";
  const getColorCode = (c: ColorItem) => c.colorCode || c.hexCode || "";
  const getSizeName = (s: SizeItem) => s.sizeName || s.size || s.name || "Size";
  const getMaterialName = (m: MaterialItem) =>
    m.materialName || m.material || m.name || "Material";

  const update = (patch: Partial<Filters>) =>
    onChange({ ...filters, ...patch });

  const applyPrice = () => {
    let min = Number(minInput) || 0;
    let max = Number(maxInput) || 0;
    if (min > max) [min, max] = [max, min];

    setMinInput(String(min));
    setMaxInput(String(max));
    update({ minPrice: min, maxPrice: max });
  };

  const clearFilters = () => {
    setMinInput(String(DEFAULT_FILTERS.minPrice));
    setMaxInput(String(DEFAULT_FILTERS.maxPrice));
    onChange(DEFAULT_FILTERS);
  };

  const inputBox =
    "flex h-9 min-w-0 items-center rounded-lg border border-gray-200 bg-[#fafafa] px-2.5 dark:border-gray-700 dark:bg-[#1d1d1d]";
  const inputText =
    "min-w-0 flex-1 bg-transparent text-[11px] font-semibold text-black outline-none dark:text-white";
  const labelClass =
    "mb-1 block text-[9px] font-medium text-gray-700 dark:text-gray-300";

  return (
    <aside className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:border-gray-800 dark:bg-[#161616]">
      {/* HEADER */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-4 dark:border-gray-800">
        <div className="min-w-0">
          <h3 className="font-serif text-[15px] font-extrabold text-black dark:text-white">
            Filters
          </h3>
          <p className="mt-0.5 text-[10px] text-gray-400">
            Refine your results
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-rose-400 px-2.5 py-1.5 text-[9px] font-bold text-white transition-all hover:bg-rose-500 dark:bg-rose-500/20 dark:text-rose-400 dark:hover:bg-rose-500/30"
        >
          <FiRotateCcw size={11} />
          <span>Clear</span>
        </button>
      </div>

      {/* PRICE */}
      <Section title="Price Range">
        <div className="px-4 pb-4">
          <input
            type="range"
            min="0"
            max="5000"
            step="50"
            value={Number(maxInput) || 0}
            onChange={(e) => setMaxInput(e.target.value)}
            className="h-1.5 w-full cursor-pointer accent-[#ffd83d]"
          />

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="min-w-0">
              <label htmlFor="min-price" className={labelClass}>
                Min Price
              </label>
              <div className={inputBox}>
                <span className="mr-1 text-[9px] text-gray-400">AED</span>
                <input
                  id="min-price"
                  type="number"
                  min="0"
                  max="5000"
                  value={minInput}
                  onChange={(e) => setMinInput(e.target.value)}
                  className={inputText}
                />
              </div>
            </div>

            <div className="min-w-0">
              <label htmlFor="max-price" className={labelClass}>
                Max Price
              </label>
              <div className={inputBox}>
                <span className="mr-1 text-[9px] text-gray-400">AED</span>
                <input
                  id="max-price"
                  type="number"
                  min="0"
                  max="5000"
                  value={maxInput}
                  onChange={(e) => setMaxInput(e.target.value)}
                  className={inputText}
                />
              </div>
            </div>
          </div>

          <ThemeBtnOne
            text="Apply Price"
            onClick={applyPrice}
            className="mt-3 flex h-9 w-full cursor-pointer items-center justify-center rounded-lg bg-[#ffd83d] px-3 text-[10px] font-extrabold text-black transition-all hover:bg-[#ffce18]"
          />
        </div>
      </Section>

      {/* REVIEWS */}
      <Section title="Customer Reviews">
        <div className="space-y-2 px-4 pb-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const selected = filters.rating === rating;

            return (
              <button
                key={rating}
                type="button"
                onClick={() => update({ rating: selected ? null : rating })}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 transition-all dark:bg-[#1d1d1d] dark:hover:border-[#ffd83d] ${
                  selected
                    ? "border-[#ffd83d] bg-[#ffd83d]/10"
                    : "border-gray-200 hover:border-[#ffd83d] dark:border-gray-700"
                }`}
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <FiStar
                      key={index}
                      className={`h-3 w-3 ${
                        index < rating
                          ? "fill-[#ffd83d] text-[#ffd83d]"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {/* COLORS */}
      <Section title="Colors">
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {apiColors.length > 0 ? (
            apiColors.map((color, index) => {
              const colorId = color._id || color.id || "";
              const colorName = getColorName(color);
              const colorCode = getColorCode(color);
              const selected = filters.colors.includes(colorId);

              return (
                <button
                  key={colorId || `${colorName}-${index}`}
                  type="button"
                  title={colorName}
                  aria-label={`Select ${colorName}`}
                  onClick={() =>
                    update({ colors: toggleItem(filters.colors, colorId) })
                  }
                  className={`relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-all duration-200 hover:scale-105 dark:border-gray-700 dark:ring-offset-[#161616] ${
                    selected
                      ? "scale-105 border-black ring-2 ring-[#ffd83d] ring-offset-2"
                      : "border-gray-200"
                  }`}
                >
                  <span
                    className="h-5 w-5 rounded-full border border-black/5 dark:border-white/10"
                    style={{ backgroundColor: colorCode || undefined }}
                  />
                </button>
              );
            })
          ) : (
            <p className="py-1 text-[10px] text-gray-400">
              No colors available
            </p>
          )}
        </div>
      </Section>

      {/* SIZE */}
      <Section title="Size">
        <div className="grid grid-cols-3 gap-2 px-4 pb-4">
          {apiSizes.length > 0 ? (
            apiSizes.map((size, index) => {
              const sizeId = size._id || size.id || "";
              const sizeName = getSizeName(size);
              const selected = filters.sizes.includes(sizeId);

              return (
                <button
                  key={sizeId || `${sizeName}-${index}`}
                  type="button"
                  onClick={() =>
                    update({ sizes: toggleItem(filters.sizes, sizeId) })
                  }
                  className={`h-9 ${chipClass(selected)}`}
                >
                  {sizeName}
                </button>
              );
            })
          ) : (
            <p className="col-span-3 py-1 text-[10px] text-gray-400">
              No sizes available
            </p>
          )}
        </div>
      </Section>

      {/* MATERIAL */}
      <Section title="Material">
        <div className="flex flex-wrap gap-2 px-4 pb-4">
          {apiMaterials.length > 0 ? (
            apiMaterials.map((material, index) => {
              const materialId = material._id || material.id || "";
              const materialName = getMaterialName(material);
              const selected = filters.materials.includes(materialId);

              return (
                <button
                  key={materialId || `${materialName}-${index}`}
                  type="button"
                  onClick={() =>
                    update({
                      materials: toggleItem(filters.materials, materialId),
                    })
                  }
                  className={`px-3 py-2 ${chipClass(selected)}`}
                >
                  {materialName}
                </button>
              );
            })
          ) : (
            <p className="py-1 text-[10px] text-gray-400">
              No materials available
            </p>
          )}
        </div>
      </Section>

      {/* AVAILABILITY */}
      <Section title="Availability" last>
        <div className="space-y-3 px-4 pb-4">
          <label
            htmlFor="in-stock"
            className="flex cursor-pointer items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                In Stock
              </p>
              <p className="mt-0.5 text-[9px] text-gray-400">
                Available products only
              </p>
            </div>
            <input
              id="in-stock"
              type="checkbox"
              checked={filters.inStock}
              onChange={(e) => update({ inStock: e.target.checked })}
              className="h-4 w-4 shrink-0 cursor-pointer accent-[#ffd83d]"
            />
          </label>

          <label
            htmlFor="on-sale"
            className="flex cursor-pointer items-center justify-between gap-3"
          >
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">
                On Sale
              </p>
              <p className="mt-0.5 text-[9px] text-gray-400">
                Discounted items
              </p>
            </div>
            <input
              id="on-sale"
              type="checkbox"
              checked={filters.onSale}
              onChange={(e) => update({ onSale: e.target.checked })}
              className="h-4 w-4 shrink-0 cursor-pointer accent-[#ffd83d]"
            />
          </label>
        </div>
      </Section>
    </aside>
  );
};

export default SideFilter;

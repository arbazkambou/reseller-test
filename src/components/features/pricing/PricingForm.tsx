"use client";

import { FormCheckboxField } from "@/components/shared/form-elements/FormCheckboxField";
import FormInputField from "@/components/shared/form-elements/FormInputField";
import SpinnerMini from "@/components/shared/skeltons/SpinnerMini";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { queryKeys } from "@/lib/query-keys/keys";
import { createPricingFormSchema } from "@/lib/zod-schemas/CreatePricingFormSchema";
import {
  createPricingTier,
  updatePricingTier,
} from "@/services/pricing.services";
import {
  ContinentTier,
  CountryTier,
  GlobalTier,
  UserTier,
} from "@/types/pricing.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type PricingFormProps = {
  regions: ContinentTier[];
  users: UserTier[];
  countries: CountryTier[];
  global: GlobalTier[];
  defaultValues?: z.infer<typeof createPricingFormSchema> & {
    priceId: string;
  };
};

// Simple RegionField component
function RegionField({
  title,
  flag,
  value,
  onChange,
  disabled,
  isImageUrl,
}: {
  title: string;
  flag: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isImageUrl?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2 mb-4">
      <div className="flex items-center gap-2">
        {isImageUrl ? (
          <div className="h-[30px] w-[60px] relative">
            <Image src={flag} alt="flag" fill className="object-c" />
          </div>
        ) : (
          <span className="text-lg">{flag}</span>
        )}

        <span className="text-sm text-muted-foreground">{title}</span>
      </div>
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-center text-sm no-spinner"
        disabled={disabled}
      />
    </div>
  );
}

export default function PricingForm({
  regions,
  users,
  countries,
  defaultValues,
  global,
}: PricingFormProps) {
  const [showUsers, setShowUsers] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<UserTier[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  type FormData = z.infer<typeof createPricingFormSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(createPricingFormSchema),
    defaultValues: defaultValues || {
      name: "",
      percent: 0,
      default: false,
      regions: [],
      countries: [],
      global: [],
      assignedUsers: [],
    },
  });

  const { control, handleSubmit, watch, setValue, reset } = form;

  const watchedPercent = watch("percent");

  const queryClient = useQueryClient();

  const { mutate: createPricingTierApi, isPending: isPriceCreating } =
    useMutation({
      mutationFn: createPricingTier,
      mutationKey: ["create-pricing-tier"],

      onSuccess: (data) => {
        if (!data.status) {
          toast.error(data.message);
          return;
        }

        form.reset();
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: [queryKeys.pricing.tier] });

        router.push(
          `${
            pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
          }/pricing/manage`
        );
      },
    });

  const { mutate: updatePricingTierApi, isPending: isPriceUpdating } =
    useMutation({
      mutationFn: updatePricingTier,
      mutationKey: ["update-pricing-tier"],

      onSuccess: (data) => {
        if (!data.status) {
          toast.error(data.message);
          return;
        }
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: [queryKeys.pricing.tier] });
        form.reset();
        router.push(
          `${
            pathname.startsWith("/reseller") ? "/reseller" : "/dealer"
          }/pricing/manage`
        );
      },
    });

  // Copy to all functionality
  const handleCopyToAll = () => {
    setValue(
      "regions",
      regions.map((region) => ({
        code: region.id,
        value: Number(watchedPercent) || 0,
      }))
    );
    setValue(
      "countries",
      countries.map((region) => ({
        code: region.id,
        value: Number(watchedPercent) || 0,
      }))
    );
    setValue(
      "global",
      global.map((global) => ({
        code: global.id,
        value: Number(watchedPercent) || 0,
      }))
    );
  };

  // Handle region value change
  const handleRegionChange = (code: number, value: string) => {
    const currentRegions = form.getValues("regions") || [];
    const updatedRegions = [
      ...currentRegions.filter((r) => r.code !== code),
      { code, value: Number(value) },
    ];
    setValue("regions", updatedRegions);
  };

  // Handle country value change
  const handleCountryChange = (code: number, value: string) => {
    const currentCountries = form.getValues("countries") || [];
    const updatedCountries = [
      ...currentCountries.filter((c) => c.code !== code),
      { code, value: Number(value) },
    ];
    setValue("countries", updatedCountries);
  };

  const handleGlobalChange = (code: string, value: string) => {
    const currentCountries = form.getValues("global") || [];
    const updatedCountries = [
      ...currentCountries.filter((c) => c.code !== String(code)),
      { code, value: Number(value) },
    ];
    setValue("global", updatedCountries);
  };

  // Handle form submission
  const onSubmit = (values: FormData) => {
    const payload = {
      name: values.name,
      percent: values.percent,
      default: values.default,
      countries: values.countries.map((c) => ({ [c.code]: c.value })),
      continents: values.regions.map((r) => ({ [r.code]: r.value })),
      users: selectedUsers.map((u) => u.id),
      global: values.global.map((r) => ({ [r.code]: r.value })),
    };

    if (defaultValues) {
      updatePricingTierApi({
        pricingPayLoad: payload,
        priceId: defaultValues.priceId,
      });
    } else {
      createPricingTierApi(payload);
    }
  };

  // Handle form clear
  const handleClear = () => {
    reset();
    setSelectedUsers([]);
    setInputValue("");
  };

  // Handle user selection/deselection
  const handleUserSelect = (user: UserTier) => {
    const isSelected = selectedUsers.some((u) => u.id === user.id);
    setSelectedUsers(
      isSelected
        ? selectedUsers.filter((u) => u.id !== user.id)
        : [...selectedUsers, user]
    );
    setInputValue(""); // Clear input after selection
  };

  // Remove selected user
  const removeUser = (userId: number) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const onError = (errors: typeof form.formState.errors) => {
    const messages = Object.values(errors)
      .map((err) => err?.message)
      .filter(Boolean)
      .join("\n");

    if (messages) {
      toast.error(messages);
    }
  };
  useEffect(() => {
    setValue(
      "assignedUsers",
      selectedUsers.map((u) => u.id),
      { shouldValidate: true }
    );
  }, [selectedUsers, setValue]);

  useEffect(() => {
    if (defaultValues?.assignedUsers) {
      setSelectedUsers(() =>
        users.filter((user) => defaultValues.assignedUsers?.includes(user.id))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="bg-card border border-border rounded-lg p-6 text-card-foreground">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit, onError)}
            className="space-y-6"
          >
            {/* Details Section */}
            <div>
              <h2 className="text-lg font-medium text-card-foreground mb-4">
                Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
                {/* Name Field */}
                <div className="flex items-center gap-3">
                  <label className="text-muted-foreground whitespace-nowrap">
                    Name:
                  </label>
                  <FormInputField
                    control={control}
                    label=""
                    name="name"
                    type="text"
                    className="w-full"
                  />
                </div>

                {/* Percent Field */}
                <div className="flex items-center gap-3">
                  <label className="text-muted-foreground whitespace-nowrap">
                    Percent:
                  </label>
                  <FormInputField
                    control={control}
                    label=""
                    name="percent"
                    type="number"
                    disabled={isPriceCreating || isPriceUpdating}
                    min={0}
                    max={100}
                    inputClassName="no-spinner"
                    className="w-full"
                  />
                </div>

                {/* Copy To All Button */}
                <div className="flex justify-center md:justify-start lg:justify-center">
                  <Button
                    type="button"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleCopyToAll();
                    }}
                    className="cursor-pointer"
                    disabled={isPriceCreating || isPriceUpdating}
                  >
                    Copy To All
                  </Button>
                </div>

                {/* Default Checkbox */}
                <div className="flex justify-center md:justify-start lg:justify-center">
                  <FormCheckboxField
                    control={control}
                    name="default"
                    label="Default"
                    disabled={isPriceCreating || isPriceUpdating}
                  />
                </div>
              </div>
            </div>

            <hr className="border-t-2 border mb-6" />

            {/* Regions Section */}
            <div>
              <h2 className="text-lg font-medium text-card-foreground mb-4">
                Regions
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8">
                {regions.map((region) => (
                  <RegionField
                    key={region.id}
                    title={region.name}
                    flag={region.image_url}
                    disabled={isPriceCreating || isPriceUpdating}
                    isImageUrl={true}
                    value={
                      form
                        .watch("regions")
                        ?.find((r) => r.code === region.id)
                        ?.value?.toString() || ""
                    }
                    onChange={(value) =>
                      handleRegionChange(Number(region.id), value)
                    }
                  />
                ))}
              </div>
            </div>

            <hr className="border-t-2 border mb-6" />

            {/* Countries Section */}
            <div>
              <h2 className="text-lg font-medium text-card-foreground mb-4">
                Countries
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8">
                {countries.map((country) => (
                  <RegionField
                    key={country.id}
                    title={country.name}
                    flag={country.emoji}
                    disabled={isPriceCreating || isPriceUpdating}
                    value={
                      form
                        .watch("countries")
                        ?.find((c) => c.code === country.id)
                        ?.value?.toString() || ""
                    }
                    onChange={(value) =>
                      handleCountryChange(Number(country.id), value)
                    }
                  />
                ))}
              </div>
            </div>

            <hr className="border-t-2 border mb-6" />
            {/* Global Section */}
            <div>
              <h2 className="text-lg font-medium text-card-foreground mb-4">
                Global
              </h2>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-8">
                {global.map((global) => (
                  <div key={global.id} className="max-w-[250px]">
                    <RegionField
                      title={global.name}
                      flag={global.emoji}
                      disabled={isPriceCreating || isPriceUpdating}
                      value={
                        form
                          .watch("global")
                          ?.find((c) => String(c.code) === global.id)
                          ?.value?.toString() || ""
                      }
                      onChange={(value) =>
                        handleGlobalChange(String(global.id), value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-t-2 border mb-6" />

            {/* Users To Assign Section */}
            <div>
              <h2 className="text-lg font-medium text-card-foreground mb-4">
                Users To Assign
              </h2>
              <div className="mb-6">
                <Command className="rounded-lg border shadow-md w-full">
                  <div className="flex flex-wrap items-center gap-2 p-2 min-h-[40px] border-b">
                    {selectedUsers.map((user) => (
                      <Badge
                        key={user.id}
                        variant="secondary"
                        className="flex items-center gap-2"
                      >
                        {user.name}
                        <button
                          type="button"
                          className="ml-1 h-3 w-3 cursor-pointer hover:text-destructive flex items-center justify-center"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            removeUser(user.id);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                    <div className="flex-1 min-w-[200px]">
                      <CommandInput
                        onFocus={() => setShowUsers(true)}
                        onBlur={() =>
                          setTimeout(() => setShowUsers(false), 150)
                        }
                        value={inputValue}
                        onValueChange={setInputValue}
                        className="border-0 shadow-none [&>svg]:hidden"
                        disabled={isPriceCreating || isPriceUpdating}
                        placeholder={
                          selectedUsers.length > 0 ? "" : "Search users..."
                        }
                      />
                    </div>
                  </div>
                  {showUsers && (
                    <CommandList>
                      <CommandEmpty>No results found.</CommandEmpty>
                      <CommandGroup heading="Users">
                        {users
                          .filter((user) => {
                            const searchTerm = inputValue.toLowerCase();
                            return (
                              user.name.toLowerCase().includes(searchTerm) ||
                              user.email.toLowerCase().includes(searchTerm)
                            );
                          })
                          .map((user) => {
                            const isSelected = selectedUsers.some(
                              (u) => u.id === user.id
                            );
                            return (
                              <CommandItem
                                key={user.id}
                                className={`flex items-center gap-2 cursor-pointer ${
                                  isSelected ? "bg-accent" : ""
                                }`}
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleUserSelect(user);
                                }}
                              >
                                <div className="flex flex-col">
                                  <span className="font-medium">
                                    {user.name}
                                  </span>
                                  <span className="text-sm text-muted-foreground">
                                    {user.email}
                                  </span>
                                </div>
                                {isSelected && (
                                  <span className="ml-auto text-primary">
                                    ✓
                                  </span>
                                )}
                              </CommandItem>
                            );
                          })}
                      </CommandGroup>
                    </CommandList>
                  )}
                </Command>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center mt-8">
              <Button
                type="submit"
                className="px-8 py-2 cursor-pointer"
                disabled={isPriceCreating || isPriceUpdating}
              >
                {isPriceCreating || isPriceUpdating ? (
                  <SpinnerMini />
                ) : (
                  "Submit"
                )}
              </Button>
              <Button
                type="button"
                onClick={handleClear}
                variant="outline"
                className="px-8 py-2 cursor-pointer"
                disabled={isPriceCreating || isPriceUpdating}
              >
                Clear
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

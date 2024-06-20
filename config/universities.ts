import { EmailOption, TranslationFunction } from "@/types"

// #TODO: Create an API & NPM package for list of universities
export function getEmailOptions() {
  return [
    "isethm.u-monastir.tn",
    "isetkh.u-monastir.tn",
    "issatmh.u-monastir.tn",
    "isima.u-monastir.tn",
    "fphm.u-monastir.tn",
    "fmdm.u-monastir.tn",
    "fmm.u-monastir.tn",
    "fsm.u-monastir.tn",
    "isimm.u-monastir.tn",
    "ensi.rnu.tn",
    "insat.rnu.tn",
    "fst.rnu.tn",
    "ipeit.rnu.tn",
    "ihec.rnu.tn",
    "ipeis.rnu.tn",
    "ipest.rnu.tn",
    "iset.rnu.tn",
    "isetn.rnu.tn",
    "issatso.rnu.tn",
    "esstt.rnu.tn",
    "enit.rnu.tn",
  ]
}

// TODO: Update the options to their correct informations
export function getTranslatedEmailOptions(
  t: TranslationFunction
): EmailOption[] {
  return [
    {
      label: t("options.iseahm"),
      abbrev: "ISEAHM",
      value: "isethm.u-monastir.tn",
      email: "mail@iseahm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=ISEAHM",
    },
    {
      label: t("options.isetkh"),
      abbrev: "ISETKH",
      value: "isetkh.u-monastir.tn",
      email: "mail@isetkh.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=ISETKH",
    },
    {
      label: t("options.issatmh"),
      abbrev: "ISSATMH",
      value: "issatmh.u-monastir.tn",
      email: "mail@fmm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=ISSATMH",
    },
    {
      label: t("options.isima"),
      abbrev: "ISIMA",
      value: "isima.u-monastir.tn",
      email: "mail@fmm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=ISIMA",
    },
    {
      label: t("options.fphm"),
      abbrev: "FPHM",
      value: "fphm.u-monastir.tn",
      email: "mail@fmm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=FPHM",
    },
    {
      label: t("options.fmdm"),
      abbrev: "FMDM",
      value: "fmdm.u-monastir.tn",
      email: "mail@fmm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=FMDM",
    },
    {
      label: t("options.fmm"),
      abbrev: "FMM",
      value: "fmm.u-monastir.tn",
      email: "mail@fmm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=FMM",
    },
    {
      label: t("options.fsm"),
      abbrev: "FSM",
      value: "fsm.u-monastir.tn",
      email: "mail@fsm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=FSM",
    },
    {
      label: t("options.isimm"),
      abbrev: "ISIMM",
      value: "isimm.u-monastir.tn",
      email: "mail@isimm.com",
      phone: "+216 73 460 000",
      avatarUrl: "https://placehold.co/600x400?text=ISIMM",
    },
    {
      label: t("options.ensi"),
      abbrev: "ENSI",
      value: "ensi.rnu.tn",
      email: "mail@ensi.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=ENSI",
    },
    {
      label: t("options.insat"),
      abbrev: "INSAT",
      value: "insat.rnu.tn",
      email: "mail@insat.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=INSAT",
    },
    {
      label: t("options.fst"),
      abbrev: "FST",
      value: "fst.rnu.tn",
      email: "mail@fst.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=FST",
    },
    {
      label: t("options.ipeit"),
      abbrev: "IPEIT",
      value: "ipeit.rnu.tn",
      email: "mail@epit.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=IPEIT",
    },
    {
      label: t("options.ihec"),
      abbrev: "IHEC",
      value: "ihec.rnu.tn",
      email: "mail@ihec.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=IHEC",
    },
    {
      label: t("options.ipeis"),
      abbrev: "IPEIS",
      value: "ipeis.rnu.tn",
      email: "mail@ipeis.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=IPEIS",
    },
    {
      label: t("options.ipest"),
      abbrev: "IPEST",
      value: "ipest.rnu.tn",
      email: "mail@ipest.com",
      phone: "+216 71 600 000",
      avatarUrl: "https://placehold.co/600x400?text=IPEST",
    },
    {
      label: t("options.iset"),
      abbrev: "ISET",
      value: "iset.rnu.tn",
      phone: "+216 71 600 000",
      email: "mail@iset.com",
      avatarUrl: "https://placehold.co/600x400?text=ISET",
    },
    {
      label: t("options.isetn"),
      abbrev: "ISETN",
      value: "isetn.rnu.tn",
      phone: "+216 71 600 000",
      email: "mail@isetn.com",
      avatarUrl: "https://placehold.co/600x400?text=ISETN",
    },
    {
      label: t("options.issatso"),
      abbrev: "ISSATSO",
      value: "issatso.rnu.tn",
      phone: "+216 71 600 000",
      email: "issatso@mail.com",
      avatarUrl: "https://placehold.co/600x400?text=ISSATSO",
    },
    {
      label: t("options.esstt"),
      abbrev: "ESSTT",
      value: "esstt.rnu.tn",
      phone: "+216 71 600 000",
      email: "mail@esstt.com",
      avatarUrl: "https://placehold.co/600x400?text=ESSTT",
    },
    {
      label: t("options.enit"),
      abbrev: "ENIT",
      value: "enit.rnu.tn",
      phone: "+216 71 600 000",
      email: "enit@mail.com",
      avatarUrl: "https://placehold.co/600x400?text=ENIT",
    },
  ]
}

export function fetchUniversityData({
  email,
  t,
}: {
  email: string
  t: TranslationFunction
}): EmailOption {
  return getTranslatedEmailOptions(t).find((option) => option.value === email)!
}

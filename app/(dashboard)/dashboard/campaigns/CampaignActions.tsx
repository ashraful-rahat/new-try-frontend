"use client";
import {
  Campaign,
  CreateCampaignDTO,
  UpdateCampaignDTO,
} from "@/app/interfaces/campaign";
import { campaignService } from "@/app/lib/api/campaignService";
import { sweetAlert } from "@/app/utils/sweetAlert";
import {
  Award,
  Calendar,
  Edit,
  FileText,
  Globe,
  Image as ImageIcon,
  Loader2,
  MapPin,
  Save,
  Upload,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface CampaignActionsProps {
  campaign?: Campaign | null;
  open: boolean;
  mode: "create" | "edit";
  onClose: () => void;
  onSuccess: () => void;
}

const CampaignActions: React.FC<CampaignActionsProps> = ({
  campaign,
  open,
  mode,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<
    CreateCampaignDTO | UpdateCampaignDTO
  >({
    title: "",
    description: "",
    category: "",
    type: "VOLUNTEER",
    startDate: new Date().toISOString().split("T")[0],
    location: "",
    volunteerLimit: undefined,
    priority: 0,
  });

  // Campaign types
  const campaignTypes = [
    { value: "VOLUNTEER", label: "স্বেচ্ছাসেবক", icon: Users },
    { value: "EVENT", label: "ইভেন্ট", icon: Calendar },
    { value: "SOCIAL_ACTIVITY", label: "সামাজিক কার্যক্রম", icon: Globe },
  ];

  // Campaign categories (from backend)
  const categories = [
    "শিক্ষা",
    "স্বাস্থ্য",
    "পরিবেশ",
    "যুব উন্নয়ন",
    "সামাজিক কার্যক্রম",
    "অন্যান্য",
  ];

  // Initialize form with campaign data for edit mode
  useEffect(() => {
    if (mode === "edit" && campaign) {
      setFormData({
        title: campaign.title,
        description: campaign.description,
        category: campaign.category,
        type: campaign.type,
        startDate: new Date(campaign.startDate).toISOString().split("T")[0],
        endDate: campaign.endDate
          ? new Date(campaign.endDate).toISOString().split("T")[0]
          : undefined,
        location: campaign.location || "",
        volunteerLimit: campaign.volunteerLimit,
        priority: campaign.priority,
      });

      // Set existing image previews
      if (campaign.images && campaign.images.length > 0) {
        setImagePreviews(campaign.images.map((img) => img.url));
      }
    } else {
      // Reset for create mode
      setFormData({
        title: "",
        description: "",
        category: "",
        type: "VOLUNTEER",
        startDate: new Date().toISOString().split("T")[0],
        location: "",
        volunteerLimit: undefined,
        priority: 0,
      });
      setImages([]);
      setImagePreviews([]);
    }
  }, [campaign, mode, open]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "volunteerLimit" || name === "priority") {
      const numValue = value === "" ? undefined : parseInt(value);
      setFormData((prev) => ({
        ...prev,
        [name]: numValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files);

    // Validate file types
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    const invalidFiles = newImages.filter(
      (file) => !validTypes.includes(file.type),
    );

    if (invalidFiles.length > 0) {
      sweetAlert.error("ত্রুটি", "শুধু JPG, PNG বা WebP ইমেজ আপলোড করা যাবে");
      return;
    }

    // Validate file sizes (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    const oversizedFiles = newImages.filter((file) => file.size > maxSize);

    if (oversizedFiles.length > 0) {
      sweetAlert.error("ত্রুটি", "ইমেজের আকার ৫এমবির বেশি হতে পারবে না");
      return;
    }

    setImages((prev) => [...prev, ...newImages]);

    // Create previews
    newImages.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (!formData.title || formData.title.length < 5) {
      sweetAlert.error("ত্রুটি", "টাইটেল কমপক্ষে ৫ অক্ষরের হতে হবে");
      return false;
    }

    if (!formData.description || formData.description.length < 20) {
      sweetAlert.error("ত্রুটি", "বিবরণ কমপক্ষে ২০ অক্ষরের হতে হবে");
      return false;
    }

    if (!formData.category) {
      sweetAlert.error("ত্রুটি", "ক্যাটাগরি নির্বাচন করুন");
      return false;
    }

    if (!formData.startDate) {
      sweetAlert.error("ত্রুটি", "শুরুর তারিখ দিন");
      return false;
    }

    if (
      formData.endDate &&
      new Date(formData.endDate) < new Date(formData.startDate)
    ) {
      sweetAlert.error("ত্রুটি", "শেষের তারিখ শুরুর তারিখের আগে হতে পারবে না");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      let result;

      if (mode === "create") {
        result = await campaignService.createCampaign(
          formData as CreateCampaignDTO,
          images,
        );
      } else {
        if (!campaign) return;
        result = await campaignService.updateCampaign(
          campaign._id,
          formData as UpdateCampaignDTO,
          images.length > 0 ? images : undefined,
        );
      }

      if (result.success) {
        sweetAlert.success(
          "সফল হয়েছে!",
          mode === "create"
            ? "ক্যাম্পেইন তৈরি করা হয়েছে"
            : "ক্যাম্পেইন আপডেট করা হয়েছে",
        );
        onSuccess();
        onClose();
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      sweetAlert.error("ত্রুটি", error.message || "কাজটি সম্পন্ন করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-700 to-green-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  {mode === "create" ? (
                    <Award className="h-6 w-6 text-white" />
                  ) : (
                    <Edit className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {mode === "create"
                      ? "নতুন ক্যাম্পেইন তৈরি করুন"
                      : "ক্যাম্পেইন সম্পাদনা করুন"}
                  </h2>
                  <p className="text-green-200 text-sm">
                    {mode === "create"
                      ? "নতুন ক্যাম্পেইনের তথ্য দিন"
                      : campaign?.title}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="overflow-y-auto max-h-[calc(90vh-80px)]"
          >
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  মৌলিক তথ্য
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Title */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ক্যাম্পেইনের নাম *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      placeholder="ক্যাম্পেইনের নাম লিখুন"
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ক্যাটাগরি *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      required
                    >
                      <option value="">ক্যাটাগরি নির্বাচন করুন</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Type */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      ক্যাম্পেইনের ধরন *
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {campaignTypes.map((type) => {
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                type: type.value as any,
                              }))
                            }
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                              formData.type === type.value
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-gray-200 hover:border-green-400 hover:bg-green-50"
                            }`}
                          >
                            <Icon className="h-5 w-5 mb-1" />
                            <span className="text-xs font-medium">
                              {type.label}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Priority */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      অগ্রাধিকার (০-১০)
                    </label>
                    <input
                      type="number"
                      name="priority"
                      value={formData.priority || 0}
                      onChange={handleInputChange}
                      min="0"
                      max="10"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    বিস্তারিত বিবরণ *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="ক্যাম্পেইনের বিস্তারিত বিবরণ লিখুন (ন্যূনতম ২০ অক্ষর)"
                    required
                  />
                </div>
              </div>

              {/* Date & Location */}
              <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  তারিখ ও অবস্থান
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Start Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      শুরুর তারিখ *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate as string}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                      required
                    />
                  </div>

                  {/* End Date */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      শেষের তারিখ (ঐচ্ছিক)
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={(formData.endDate as string) || ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      অবস্থান (ঐচ্ছিক)
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="ক্যাম্পেইনের অবস্থান"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Volunteer & Images */}
              <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-xl p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Volunteer Limit */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      স্বেচ্ছাসেবক সীমা
                    </h3>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        সর্বোচ্চ স্বেচ্ছাসেবক সংখ্যা (ঐচ্ছিক)
                      </label>
                      <input
                        type="number"
                        name="volunteerLimit"
                        value={formData.volunteerLimit || ""}
                        onChange={handleInputChange}
                        min="1"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                        placeholder="যেমন: 100"
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-purple-600" />
                      ক্যাম্পেইন ছবি (ঐচ্ছিক)
                    </h3>

                    <div className="space-y-4">
                      {/* Upload Button */}
                      <label className="block">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 cursor-pointer transition-colors">
                          <Upload className="h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm font-medium text-gray-600">
                            ছবি আপলোড করুন
                          </span>
                          <span className="text-xs text-gray-500 mt-1">
                            JPG, PNG বা WebP (সর্বোচ্চ ৫এমবি)
                          </span>
                        </div>
                      </label>

                      {/* Image Previews */}
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <Image
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                width={80}
                                height={80}
                                className="h-20 w-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 font-medium transition-colors"
                  disabled={loading}
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 font-medium transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      সংরক্ষণ হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      {mode === "create"
                        ? "ক্যাম্পেইন তৈরি করুন"
                        : "সংরক্ষণ করুন"}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Import missing icon

export default CampaignActions;

const NotificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: String,
  type: String,
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);

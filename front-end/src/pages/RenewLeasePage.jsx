import { zodResolver } from "@hookform/resolvers/zod";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";
import { fetchLeaseRenewal, renewLease } from "../api/leaseApi";
import Spinner from "../components/Spinner";

const leaseSchema = z.object({
  lease_start_date: z
    .date({ required_error: "Lease start date is required." })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Please select a valid date",
    }),
  lease_end_date: z
    .date({ required_error: "Lease end date is required." })
    .refine((date) => !isNaN(date.getTime()), {
      message: "Please select a valid date",
    }),
  monthly_rent_in_dollars: z.string().transform((val) => Number(val)),
  notes: z.string().max(100).optional(),
});

const LeaseRenewPage = () => {
  const { id: leaseId } = useParams();
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["leaseInfo", leaseId],
    queryFn: () => fetchLeaseRenewal(leaseId),
  });

  if (error) {
    toast.error("An error occurred. Please try again");
  }

  const {
    register,
    handleSubmit,
    control,
    isSubmitting,
    formState: { errors },
  } = useForm({
    values: {
      monthly_rent_in_dollars: data?.monthly_rent_in_dollars?.toString(),
      notes: data?.notes,
    },
    resolver: zodResolver(leaseSchema),
  });

  const { mutate: sendNewLease } = useMutation({
    mutationFn: ({ leaseId, formData }) => renewLease(leaseId, formData),
    onMutate: () => {
      return <Spinner />;
    },
    onSuccess: () => {
      toast.success("Lease renewed successfully");
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred. Please try again");
    },
  });

  const onSubmit = (formData) => {
    sendNewLease({ leaseId, formData });
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <Paper sx={{ padding: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("apartment_id")} />
              <Typography variant="h6" paddingBottom={1}>
                Lease Details
              </Typography>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid2 container spacing={2}>
                  <Grid2 item xs={6} size={6}>
                    {/* Controllers needed to manage the mui input state via react hook form with custom error element */}
                    <Controller
                      name="lease_start_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="Start Date"
                          className="w-full"
                          disablePast
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                          renderInput={(params) => (
                            <TextField {...params} fullWidth />
                          )}
                        />
                      )}
                    />
                    <p className="text-xs text-red-700 mt-1.5">
                      {errors.lease_start_date?.message}
                    </p>
                  </Grid2>
                  <Grid2 item xs={6} size={6}>
                    <Controller
                      name="lease_end_date"
                      control={control}
                      render={({ field }) => (
                        <DatePicker
                          {...field}
                          label="End Date"
                          disablePast
                          className="w-full"
                          value={field.value || null}
                          onChange={(date) => field.onChange(date)}
                        />
                      )}
                    />
                    <p className="text-xs text-red-700 mt-1.5">
                      {errors.lease_start_date?.message}
                    </p>
                  </Grid2>
                </Grid2>
              </LocalizationProvider>
              <TextField
                label="Monthly Rent (in dollars)"
                fullWidth
                type="number"
                margin="normal"
                {...register("monthly_rent_in_dollars")}
                error={!!errors.monthly_rent_in_dollars}
                helperText={errors.monthly_rent_in_dollars?.message}
              />
              <TextField
                label="Notes"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                {...register("notes")}
                error={!!errors.notes}
                helperText={errors.notes?.message}
              />
              <Box sx={{ textAlign: "right", paddingTop: 1, paddingRight: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || Object.keys(errors).length > 0}
                  endIcon={<SendIcon />}
                >
                  {isSubmitting ? "Submitting..." : "Renew Lease"}
                </Button>
              </Box>
            </form>
          </Paper>
        </div>
      )}
    </>
  );
};

export default LeaseRenewPage;

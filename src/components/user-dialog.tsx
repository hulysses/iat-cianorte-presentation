import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { User } from "@/types/users";

type UserDialogProps = {
  openDelete: boolean;
  setOpenDelete: (open: boolean) => void;
  selectedUserDelete: User | null;
  handleDelete: () => void;
  isSubmitting: boolean;
};

export default function UserDialog({
  openDelete,
  setOpenDelete,
  selectedUserDelete,
  handleDelete,
  isSubmitting,
}: UserDialogProps) {
  return (
    <Dialog open={openDelete} onOpenChange={setOpenDelete}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir usuário</DialogTitle>
          <DialogDescription>
            Essa ação não pode ser desfeita. Você tem certeza que deseja excluir
            o usuário{" "}
            <span className="text-primary font-bold">
              {selectedUserDelete?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="text-sm">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit" onClick={handleDelete} className="text-sm">
            {isSubmitting ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
